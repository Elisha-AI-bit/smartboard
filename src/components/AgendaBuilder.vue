<template>
  <div class="agenda-builder card">
    <div class="flex justify-between items-center mb-6">
      <h3 class="flex items-center gap-2">
        <ListIcon :size="20" class="text-primary" />
        Agenda Builder
      </h3>
      <div class="flex gap-2">
        <button class="btn btn-outline btn-sm" @click="addSection">
          <PlusIcon :size="14" class="mr-1" /> Add Section
        </button>
      </div>
    </div>

    <div class="agenda-items flex flex-col gap-3">
      <div v-for="(item, index) in agendaItems" :key="item.id" 
           class="agenda-item p-4 border rounded-lg bg-white draggable"
           :class="{ dragging: draggingIndex === index }"
           draggable="true"
           @dragstart="onDragStart(index)"
           @dragover.prevent
           @drop="onDrop(index)">
        <div class="flex items-center gap-4">
          <div class="drag-handle cursor-grab text-slate-300">
            <GripVerticalIcon :size="18" />
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-xs font-bold text-slate-400">#{{ index + 1 }}</span>
              <input v-model="item.title" class="title-input font-medium" placeholder="Topic title..." />
            </div>
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-1 text-xs text-muted">
                <ClockIcon :size="12" />
                <input v-model="item.duration" class="inline-input w-12" placeholder="Time" /> min
              </div>
              <div class="flex items-center gap-1 text-xs text-muted">
                <UserIcon :size="12" />
                <input v-model="item.presenter" class="inline-input w-24" placeholder="Presenter" />
              </div>
            </div>
          </div>
          <div class="flex gap-2">
            <button @click="toggleDoc(item.id)" class="icon-btn" :class="{ active: item.hasDocs }">
              <PaperclipIcon :size="16" />
            </button>
            <button @click="removeItem(index)" class="icon-btn hover:text-danger">
              <TrashIcon :size="16" />
            </button>
          </div>
        </div>
        
        <!-- Attached Documents Mockup -->
        <div v-if="item.hasDocs" class="attached-docs mt-3 p-2 bg-slate-50 rounded border-t">
          <div class="text-xs font-medium text-slate-500 mb-2">Attached Documents</div>
          <div class="flex flex-wrap gap-2">
            <span class="badg-doc text-xs px-2 py-1 bg-white border rounded flex items-center gap-1">
              <FileIcon :size="10" /> Strategic_Plan_Draft.pdf <XIcon :size="10" />
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8 flex justify-end gap-3 pt-4 border-t">
      <button class="btn btn-outline">Save Template</button>
      <button class="btn btn-primary">Generate Board Pack</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  List as ListIcon, 
  Plus as PlusIcon, 
  GripVertical as GripVerticalIcon, 
  Clock as ClockIcon, 
  User as UserIcon,
  Trash as TrashIcon,
  Paperclip as PaperclipIcon,
  File as FileIcon,
  X as XIcon
} from 'lucide-vue-next'

const agendaItems = ref([
  { id: 1, title: 'Call to Order & Approval of Minutes', duration: '10', presenter: 'Chairperson', hasDocs: false },
  { id: 2, title: 'Q1 Financial Performance Review', duration: '30', presenter: 'CFO', hasDocs: true },
  { id: 3, title: 'Strategic Initiative: Asian Expansion', duration: '45', presenter: 'CEO', hasDocs: true },
  { id: 4, title: 'Any Other Business (AOB)', duration: '15', presenter: 'All', hasDocs: false }
])

const draggingIndex = ref(null)

const addSection = () => {
  agendaItems.value.push({
    id: Date.now(),
    title: '',
    duration: '15',
    presenter: '',
    hasDocs: false
  })
}

const removeItem = (index) => {
  agendaItems.value.splice(index, 1)
}

const toggleDoc = (id) => {
  const item = agendaItems.value.find(i => i.id === id)
  if (item) item.hasDocs = !item.hasDocs
}

const onDragStart = (index) => {
  draggingIndex.value = index
}

const onDrop = (index) => {
  const item = agendaItems.value.splice(draggingIndex.value, 1)[0]
  agendaItems.value.splice(index, 0, item)
  draggingIndex.value = null
}
</script>

<style scoped>
.agenda-item { transition: all 0.2s; border: 1px solid var(--border); }
.agenda-item:hover { border-color: var(--primary); }
.agenda-item.dragging { opacity: 0.5; background: var(--primary-light); }

.title-input {
  border: none;
  background: transparent;
  width: 100%;
  font-size: 1rem;
  outline: none;
  font-weight: 600;
  color: var(--text-main);
}

.inline-input {
  border: none;
  background: transparent;
  outline: none;
  color: var(--text-muted);
  font-weight: 500;
  border-bottom: 1px solid transparent;
}

.inline-input:focus {
  border-bottom-color: var(--primary);
}

.icon-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  padding: 0.25rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-btn:hover { background: var(--background); color: var(--text-main); }
.icon-btn.active { color: var(--primary); font-weight: bold; }

.badg-doc { border-color: var(--border); }
</style>
