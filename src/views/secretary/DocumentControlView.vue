<template>
  <div class="doc-control">
    <header class="flex justify-between items-center mb-8">
      <div>
        <h1>Document Control</h1>
        <p class="text-muted">Upload and manage secure board packs and organizational compliance documents.</p>
      </div>
      <button class="btn btn-primary" @click="notify('Upload', 'Opening secure file vault...', 'info')">
        <UploadIcon :size="18" class="mr-2" /> Upload Board Pack
      </button>
    </header>

    <div class="grid grid-cols-4 gap-6 mb-12">
      <div v-for="stat in stats" :key="stat.label" class="card p-6">
        <div class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{{ stat.label }}</div>
        <div class="text-3xl font-black text-slate-900">{{ stat.value }}</div>
        <div class="text-[10px] mt-2 text-success font-bold">{{ stat.change }} from last month</div>
      </div>
    </div>

    <div class="card p-0">
      <div class="p-6 border-b flex justify-between items-center">
        <h3 class="font-bold">Recent Uploads & Transitions</h3>
        <div class="flex gap-2">
          <button class="btn btn-outline btn-sm">Filter</button>
          <button class="btn btn-outline btn-sm">Sort</button>
        </div>
      </div>
      <table class="w-full text-sm">
        <thead class="bg-slate-50 border-b">
          <tr>
            <th class="text-left py-4 px-6 text-slate-500">Document</th>
            <th class="text-left py-4 px-6 text-slate-500">Classification</th>
            <th class="text-left py-4 px-6 text-slate-500">Access Level</th>
            <th class="text-right py-4 px-6 text-slate-500">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="doc in recentDocs" :key="doc.name" class="border-b hover:bg-slate-50">
            <td class="py-4 px-6 font-bold text-slate-900">{{ doc.name }}</td>
            <td class="py-4 px-6">
              <span class="badge" :class="`badge-${doc.color}`">{{ doc.category }}</span>
            </td>
            <td class="py-4 px-6 text-slate-600">
              <div class="flex items-center gap-1">
                <LockIcon :size="12" /> {{ doc.access }}
              </div>
            </td>
            <td class="py-4 px-6 text-right">
              <span class="text-xs font-bold px-2 py-1 rounded bg-emerald-50 text-emerald-600 uppercase">{{ doc.status }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { Upload as UploadIcon, Lock as LockIcon } from 'lucide-vue-next'

const notify = inject('notify')

const stats = [
  { label: 'Total Files', value: '1,248', change: '+12%' },
  { label: 'Board Packs', value: '42', change: '+5%' },
  { label: 'Storage Used', value: '8.4 GB', change: '+2%' },
  { label: 'Encrypted', value: '100%', change: 'Stable' }
]

const recentDocs = [
  { name: 'FY25_Audit_Strategy.pdf', category: 'Audit', color: 'rose', access: 'Restricted', status: 'Secured' },
  { name: 'Expansion_Plan_SE_Asia.pdf', category: 'Strategy', color: 'cyan', access: 'Board Only', status: 'Secured' },
  { name: 'Constitution_Amendment_v3.docx', category: 'Legal', color: 'indigo', access: 'Public', status: 'Published' }
]
</script>
