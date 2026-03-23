<template>
  <div class="audit-logs">
    <header class="flex justify-between items-center mb-8">
      <div>
        <h1>Audit Logs</h1>
        <p class="text-muted">Security oversight and system activity tracking for transparency and compliance.</p>
      </div>
      <div class="flex gap-3">
        <button class="btn btn-outline" @click="notify('Exporting', 'Generating CSV audit trail...', 'info')">Export CSV</button>
        <button class="btn btn-primary" @click="notify('Filters', 'Opening advanced security filters...', 'info')">
          <FilterIcon :size="18" class="mr-2" /> Filters
        </button>
      </div>
    </header>

    <div class="card p-0 overflow-hidden">
      <div v-for="log in logs" :key="log.id" class="flex items-center gap-4 p-4 border-b last:border-0 hover:bg-slate-50 transition-colors">
        <div class="w-10 h-10 rounded-lg flex items-center justify-center" :class="log.type === 'security' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'">
          <ShieldAlertIcon v-if="log.type === 'security'" :size="18" />
          <ActivityIcon v-else :size="18" />
        </div>
        <div class="flex-1">
          <div class="flex items-center justify-between mb-1">
            <span class="text-sm font-bold text-slate-900">{{ log.action }}</span>
            <span class="text-xs text-muted">{{ log.timestamp }}</span>
          </div>
          <div class="text-xs text-slate-500">
            <span class="font-bold text-slate-700">{{ log.user }}</span> 
            accessed from IP: <span class="text-slate-900">{{ log.ip }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { Filter as FilterIcon, ShieldAlert as ShieldAlertIcon, Activity as ActivityIcon } from 'lucide-vue-next'

const notify = inject('notify')

const logs = ref([
  { id: 1, action: 'Bulk Document Export', user: 'Mwila Phiri', type: 'activity', timestamp: '12 mins ago', ip: '41.215.160.22' },
  { id: 2, action: 'Failed Login Attempt', user: 'Unknown', type: 'security', timestamp: '45 mins ago', ip: '196.25.101.44' },
  { id: 3, action: 'Strategic Goal Adjusted', user: 'Mutale Chanda', type: 'activity', timestamp: '2 hours ago', ip: '41.215.160.22' },
  { id: 4, action: 'User Permissions Modified', user: 'Mutale Chanda', type: 'security', timestamp: 'Yesterday', ip: '41.215.160.22' }
])
</script>
