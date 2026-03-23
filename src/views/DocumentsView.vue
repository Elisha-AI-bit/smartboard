<template>
  <div class="documents-view">
    <header class="flex justify-between items-center mb-8">
      <div>
        <h1>Document Management</h1>
        <p class="text-muted">Securely store, organize, and compile board-level documentation.</p>
      </div>
      <div class="flex gap-3">
        <button class="btn btn-outline" @click="notify('Action Restricted', 'Folder creation is disabled.', 'info')">
          <FolderPlusIcon :size="18" class="mr-2" /> New Folder
        </button>
        <button class="btn btn-primary" @click="notify('Upload Initiated', 'Select a file to upload to the board repository.', 'success')">
          <UploadIcon :size="18" class="mr-2" /> Upload Document
        </button>
      </div>
    </header>

    <div class="grid grid-cols-4 gap-8">
      <!-- Sidebar Folders -->
      <aside class="col-span-1 border-r pr-6">
        <h4 class="text-xs font-bold text-slate-400 uppercase mb-4">Repositories</h4>
        <nav class="flex flex-col gap-1">
          <div v-for="folder in folders" :key="folder.name" 
               @click="handleFolderClick(folder)"
               class="flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors"
               :class="folder.active ? 'bg-primary-light text-primary' : 'hover:bg-slate-100 text-slate-600'">
            <FolderIcon :size="18" :style="{ color: `var(--${folder.color})` }" />
            <span class="text-sm font-medium">{{ folder.name }}</span>
            <span class="ml-auto text-xs opacity-50">{{ folder.count }}</span>
          </div>
        </nav>

        <div class="mt-8 p-4 bg-slate-50 rounded-lg border border-dashed text-center">
          <div class="text-xs font-bold text-slate-500 mb-2">Board Pack Compiler</div>
          <p class="text-xs text-muted mb-4">Select documents to compile into a single structured PDF.</p>
          <button class="btn btn-primary w-full text-xs py-2" @click="notify('Compiler Launching', 'Initializing board pack compilation engine...', 'info')">
            Open Compiler
          </button>
        </div>
      </aside>

      <!-- Document List Area -->
      <div class="col-span-3">
        <!-- Search & Filter -->
        <div class="flex justify-between items-center mb-6">
          <div class="flex gap-4">
            <div class="search-box flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border w-80">
              <SearchIcon :size="16" class="text-muted" />
              <input type="text" placeholder="Search and filter documents..." class="bg-transparent border-none outline-none text-sm w-full" />
            </div>
            <select class="p-1.5 border rounded-lg bg-white text-sm outline-none" @change="notify('Filter Applied', 'Updating document list...', 'info')">
              <option>All Types</option>
              <option>PDFs</option>
              <option>Spreadsheets</option>
            </select>
          </div>
          <div class="flex gap-2">
            <button class="p-2 border rounded-lg hover:bg-slate-100" @click="notify('View Changed', 'Switching to grid view...', 'info')"><LayoutGridIcon :size="18" /></button>
            <button class="p-2 border rounded-lg bg-slate-100" @click="notify('View Changed', 'Switching to list view...', 'info')"><ListIcon :size="18" /></button>
          </div>
        </div>

        <!-- Documents Table -->
        <div class="card overflow-hidden">
          <table class="w-full">
            <thead class="bg-slate-50 border-b">
              <tr>
                <th class="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase">Document Name</th>
                <th class="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase">Last Modified</th>
                <th class="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase">Size</th>
                <th class="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase">Owner</th>
                <th class="text-right py-3 px-4 text-xs font-bold text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="doc in documents" :key="doc.name" class="border-b hover:bg-slate-50 transition-colors group">
                <td class="py-4 px-4">
                  <div class="flex items-center gap-3">
                    <div class="doctype-icon" :class="doc.type">
                      <FileTextIcon v-if="doc.type === 'pdf'" :size="18" />
                      <TableIcon v-else-if="doc.type === 'xlsx'" :size="18" />
                      <FileIcon v-else :size="18" />
                    </div>
                    <div>
                      <div class="text-sm font-medium text-slate-900 group-hover:text-primary transition-colors text-truncate max-w-[200px]">{{ doc.name }}</div>
                      <div class="text-xs text-muted">{{ doc.version }} Version Control</div>
                    </div>
                  </div>
                </td>
                <td class="py-4 px-4 text-sm text-slate-600">{{ doc.modified }}</td>
                <td class="py-4 px-4 text-sm text-slate-600">{{ doc.size }}</td>
                <td class="py-4 px-4">
                  <div class="flex items-center gap-2">
                    <div class="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold">{{ doc.ownerInitials }}</div>
                    <span class="text-sm">{{ doc.owner }}</span>
                  </div>
                </td>
                <td class="py-4 px-4 text-right">
                  <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button class="p-1.5 hover:bg-white hover:shadow-sm rounded" @click="handleDownload(doc)"><DownloadIcon :size="16" /></button>
                    <button class="p-1.5 hover:bg-white hover:shadow-sm rounded" @click="notify('Options', 'Opening file options for ' + doc.name, 'info')"><MoreVerticalIcon :size="16" /></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue'
import { subscribeToDocuments } from '../services/firebaseService'
import { 
  FolderPlus as FolderPlusIcon,
  Upload as UploadIcon,
  Folder as FolderIcon,
  Search as SearchIcon,
  LayoutGrid as LayoutGridIcon,
  List as ListIcon,
  FileText as FileTextIcon,
  File as FileIcon,
  Table as TableIcon,
  PlusCircle as PlusCircleIcon,
  Download as DownloadIcon,
  MoreVertical as MoreVerticalIcon
} from 'lucide-vue-next'

const notify = inject('notify')
const documents = ref([])
let unsubscribe = null

onMounted(() => {
  unsubscribe = subscribeToDocuments((data) => {
    documents.value = data.length > 0 ? data : defaultDocuments
  })
})

onUnmounted(() => {
  if (unsubscribe) unsubscribe()
})

const handleFolderClick = (f) => {
  folders.value.forEach(folder => folder.active = (folder.name === f.name))
  notify('Repository Switched', `Now viewing: ${f.name}`, 'info')
}

const handleDownload = (doc) => {
  notify('Download Started', `Preparing ${doc.name} for secure access...`, 'info')
}

const folders = ref([
  { name: 'Strategic Plans', count: 12, active: true, color: 'cyan' },
  { name: 'Financial Reports', count: 45, active: false, color: 'emerald' },
  { name: 'Board Minutes', count: 28, active: false, color: 'indigo' },
  { name: 'Risk Registers', count: 8, active: false, color: 'orange' },
  { name: 'Audit Documents', count: 18, active: false, color: 'amber' },
  { name: 'Compliance & Legal', count: 32, active: false, color: 'slate' }
])

const defaultDocuments = [
  { id: 1, name: 'ZCCM-IH_Strategic_Plan_2026.pdf', type: 'pdf', version: 'v1.4', modified: '2 hours ago', size: '4.2 MB', owner: 'Mutale Chanda', ownerInitials: 'MC' },
  { id: 2, name: 'Lafarge_Zambia_FY26_Budget.xlsx', type: 'xlsx', version: 'v3.1', modified: 'Yesterday', size: '1.8 MB', owner: 'Mwila Phiri', ownerInitials: 'MP' },
  { id: 3, name: 'ZRA_Tax_Compliance_Cert.pdf', type: 'pdf', version: 'v1.0', modified: 'Mar 20, 2026', size: '2.1 MB', owner: 'Sec Office', ownerInitials: 'SO' }
]
</script>

<style scoped>
.col-span-3 { grid-column: span 3 / span 3; }
.doctype-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.doctype-icon.pdf { background-color: #fee2e2; color: #ef4444; }
.doctype-icon.xlsx { background-color: #dcfce7; color: #22c55e; }

table th { text-transform: uppercase; letter-spacing: 0.05em; }
</style>
