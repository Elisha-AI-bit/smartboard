<template>
  <div class="doc-viewer h-full flex flex-col">
    <header class="flex justify-between items-center mb-6">
      <div class="flex items-center gap-4">
        <button class="p-2 hover:bg-slate-100 rounded-lg" @click="$router.back()">
          <ArrowLeftIcon :size="20" />
        </button>
        <div>
          <h1 class="text-xl">Q1_Strategic_Plan_v1.4.pdf</h1>
          <p class="text-xs text-muted">Last modified 2 hours ago by Mutale Chanda</p>
        </div>
      </div>
      <div class="flex gap-2 text-sm">
        <button class="btn btn-outline btn-sm px-4">
          <ShareIcon :size="16" class="mr-2" /> Share
        </button>
        <button class="btn btn-primary btn-sm px-4">
          <DownloadIcon :size="16" class="mr-2" /> Download
        </button>
      </div>
    </header>

    <div class="grid grid-cols-12 gap-6 flex-1 overflow-hidden">
      <!-- PDF Mock View -->
      <div class="col-span-12 lg:col-span-9 bg-slate-200 rounded-2xl border-4 border-slate-300 overflow-y-auto p-12 flex flex-col items-center gap-12 shadow-inner">
        <div v-for="p in 3" :key="p" class="bg-white w-[800px] h-[1100px] shadow-2xl rounded-sm p-20 relative">
          <div class="absolute top-10 right-10 text-[10px] text-slate-300 font-bold uppercase tracking-widest">Confidential • ZCCM-IH PLC</div>
          <div class="w-24 h-1 bg-primary mb-10"></div>
          <h2 class="text-3xl font-black text-slate-900 mb-8">Strategic Analysis (Page {{ p }})</h2>
          <div class="space-y-6">
            <div class="h-4 bg-slate-100 w-full rounded"></div>
            <div class="h-4 bg-slate-100 w-5/6 rounded"></div>
            <div class="h-4 bg-slate-100 w-full rounded"></div>
            <div class="h-4 bg-slate-100 w-4/6 rounded"></div>
            <div class="grid grid-cols-2 gap-8 mt-12">
              <div class="h-48 bg-slate-50 border rounded-xl border-dashed border-slate-300"></div>
              <div class="h-48 bg-slate-50 border rounded-xl border-dashed border-slate-300"></div>
            </div>
            <div class="h-4 bg-slate-100 w-full rounded mt-12"></div>
            <div class="h-4 bg-slate-100 w-full rounded"></div>
          </div>
          <div class="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 font-bold">- {{ p }} -</div>
        </div>
      </div>

      <!-- Collaboration Sidebar -->
      <div class="col-span-12 lg:col-span-3 flex flex-col gap-6">
        <div class="card p-6 flex-1">
          <h3 class="font-bold text-sm mb-6 flex items-center gap-2">
            <MessageSquareIcon :size="18" class="text-primary" />
            Collaboration Annotations
          </h3>
          
          <div class="space-y-6 overflow-y-auto max-h-[500px] pr-2">
            <div v-for="note in annotations" :key="note.id" class="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-6 h-6 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-bold">
                  {{ note.user[0] }}
                </div>
                <span class="text-xs font-bold text-slate-900">{{ note.user }}</span>
                <span class="text-[10px] text-muted ml-auto">{{ note.time }}</span>
              </div>
              <p class="text-xs text-slate-600 leading-relaxed">{{ note.text }}</p>
            </div>
          </div>

          <div class="mt-auto pt-6 border-t">
            <textarea 
              class="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs outline-none focus:border-primary transition-all"
              rows="3"
              placeholder="Add a comment or highlight..."
            ></textarea>
            <button class="btn btn-primary w-full mt-3 btn-sm py-2" @click="notify('Posted', 'Your annotation has been shared with the board.', 'success')">
              Post Comment
            </button>
          </div>
        </div>

        <div class="card p-6 bg-slate-900 text-white">
          <h3 class="font-bold text-sm mb-4 flex items-center gap-2">
            <SparklesIcon :size="18" class="text-primary" />
            AI Document Summary
          </h3>
          <p class="text-[11px] text-slate-400 leading-relaxed">
            This document outlines a 15% increase in capital expenditure for the Copperbelt mining project. Key risks identified include exchange rate volatility and supply chain delays in the Southern African region.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { 
  ArrowLeft as ArrowLeftIcon, 
  Share as ShareIcon, 
  Download as DownloadIcon, 
  MessageSquare as MessageSquareIcon,
  Sparkles as SparklesIcon
} from 'lucide-vue-next'

const notify = inject('notify')

const annotations = ref([
  { id: 1, user: 'Mutale Chanda', time: '1h ago', text: 'Section 4.2 needs clarification on the tax implications.' },
  { id: 2, user: 'Mwila Phiri', time: '30m ago', text: 'I agree. We should invite the Tax Lead to the next sitting.' }
])
</script>

<style scoped>
.doc-viewer { height: calc(100vh - 160px); }
</style>
