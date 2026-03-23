<template>
  <div class="agenda-editor">
    <header class="flex justify-between items-center mb-8">
      <div>
        <h1>Agenda & Minutes Editor</h1>
        <p class="text-muted">Draft agendas and record minutes live during board sittings.</p>
      </div>
      <div class="flex gap-3">
        <button class="btn btn-outline" @click="notify('Drafting', 'Saving latest agenda draft...', 'info')">Save Draft</button>
        <button class="btn btn-primary" @click="notify('Publishing', 'Sending agenda to all board members...', 'success')">
          Publish Agenda
        </button>
      </div>
    </header>

    <div class="grid grid-cols-12 gap-8">
      <!-- Agenda Builder Left -->
      <div class="col-span-12 lg:col-span-8">
        <div class="card p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="font-bold text-lg">Meeting: Q1 Strategic Review</h3>
            <button class="text-primary text-sm font-bold flex items-center gap-1" @click="addAgendaItem">
              <PlusIcon :size="16" /> Add Item
            </button>
          </div>

          <div class="space-y-4">
            <div v-for="(item, index) in agendaItems" :key="index" class="p-4 bg-slate-50 rounded-xl border border-slate-200 group">
              <div class="flex items-start gap-4">
                <div class="w-8 h-8 rounded bg-white border flex items-center justify-center font-bold text-slate-400">
                  {{ index + 1 }}
                </div>
                <div class="flex-1">
                  <div class="flex justify-between mb-2">
                    <input v-model="item.title" class="bg-transparent font-bold text-slate-900 border-none outline-none w-full" placeholder="Enter agenda item title..." />
                    <span class="text-xs text-muted font-medium">{{ item.duration }} mins</span>
                  </div>
                  <textarea v-model="item.notes" class="w-full bg-transparent text-sm text-slate-600 border-none outline-none resize-none" placeholder="Add discussion points or notes..."></textarea>
                  
                  <div class="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button class="text-xs flex items-center gap-1 text-primary" @click="notify('Attachment', 'Opening document library...', 'info')">
                      <PaperclipIcon :size="12" /> Attach Doc
                    </button>
                    <button class="text-xs flex items-center gap-1 text-slate-500" @click="agendaItems.splice(index, 1)">
                      <TrashIcon :size="12" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Live Minutes Right -->
      <div class="col-span-12 lg:col-span-4">
        <div class="card p-6 h-full bg-slate-900 text-white">
          <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
            <MicIcon :size="20" class="text-primary" />
            Live Minutes
          </h3>
          <p class="text-xs text-slate-400 mb-6 uppercase tracking-wider font-bold">Recording Session...</p>
          
          <div class="space-y-6">
            <div class="border-l-2 border-primary pl-4">
              <div class="text-[10px] text-slate-500 mb-1">10:15 AM - CHAIRPERSON</div>
              <p class="text-sm">Meeting called to order. Adoption of previous minutes from February session.</p>
            </div>
            <div class="border-l-2 border-slate-700 pl-4">
              <div class="text-[10px] text-slate-500 mb-1">10:30 AM - SEC</div>
              <p class="text-sm">Presenting the ESG implementation progress report for the Copperbelt mining project.</p>
            </div>
            
            <textarea 
              class="w-full bg-slate-800 border border-slate-700 rounded-lg p-4 text-sm text-white placeholder-slate-500 outline-none focus:border-primary" 
              rows="6"
              placeholder="Recording live minutes here..."
            ></textarea>
            
            <button class="btn btn-primary w-full shadow-lg shadow-blue-900/40" @click="notify('Saved', 'Live minutes have been synced to cloud.', 'success')">
              Sync Live Minutes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { Plus as PlusIcon, Paperclip as PaperclipIcon, Trash as TrashIcon, Mic as MicIcon } from 'lucide-vue-next'

const notify = inject('notify')

const agendaItems = ref([
  { title: 'Adoption of Previous Minutes', notes: 'Review and sign off on meeting conducted on 15 Feb 2026.', duration: 15 },
  { title: 'Managing Director\'s Report', notes: 'Quarterly performance overview and market trends in Zambia.', duration: 45 },
  { title: 'Update on Lusaka Multi-Facility Economic Zone', notes: 'Status of the new infrastructure development project.', duration: 30 }
])

const addAgendaItem = () => {
  agendaItems.value.push({ title: '', notes: '', duration: 15 })
}
</script>

<style scoped>
/* Spacing fix for inputs/textareas */
input:focus, textarea:focus {
  background-color: rgba(37, 99, 235, 0.03) !important;
  border-radius: 4px;
}
</style>
