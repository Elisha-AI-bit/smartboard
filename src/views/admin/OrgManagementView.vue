<template>
  <div class="org-mgmt">
    <header class="flex justify-between items-center mb-8">
      <div>
        <h1>Organization Management</h1>
        <p class="text-muted">Define the corporate structure, departments, and committees for your board.</p>
      </div>
      <button class="btn btn-primary" @click="notify('Action Restricted', 'Structural changes require board resolution approval.', 'warning')">
        <PlusIcon :size="18" class="mr-2" /> New Committee
      </button>
    </header>

    <div class="grid grid-cols-3 gap-6">
      <div v-for="dept in departments" :key="dept.id" class="card p-6 border-l-4" :class="`border-${dept.color}-500`">
        <div class="flex justify-between items-start mb-4">
          <div class="p-2 rounded bg-slate-50 text-slate-700">
            <BuildingIcon :size="20" />
          </div>
          <span class="badge" :class="`badge-${dept.color}`">{{ dept.type }}</span>
        </div>
        <h3 class="text-lg font-bold text-slate-900 mb-1">{{ dept.name }}</h3>
        <p class="text-xs text-muted mb-4">{{ dept.description }}</p>
        <div class="flex items-center justify-between pt-4 border-t text-sm font-medium">
          <span class="text-slate-600">{{ dept.memberCount }} Members</span>
          <button class="text-primary hover:underline" @click="notify('Viewing', `Accessing ${dept.name} roster...`, 'info')">View Roster</button>
        </div>
      </div>
    </div>

    <!-- Committees Section -->
    <h2 class="mt-12 mb-6">Active Committees</h2>
    <div class="grid grid-cols-2 gap-6">
      <div v-for="com in committees" :key="com.id" class="card flex items-center p-6 gap-6 hover:shadow-md transition-shadow">
        <div class="w-16 h-16 rounded-full flex items-center justify-center text-white font-black text-xl" :class="`bg-${com.color}-500 shadow-lg shadow-${com.color}-100`">
          {{ com.name[0] }}
        </div>
        <div class="flex-1">
          <h4 class="font-bold text-lg">{{ com.name }} Committee</h4>
          <p class="text-sm text-muted">Lead: {{ com.chair }}</p>
        </div>
        <div class="text-right">
          <div class="text-xs font-bold text-slate-400 mb-1 uppercase">Next Sitting</div>
          <div class="text-sm font-medium">{{ com.nextMeeting }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { Plus as PlusIcon, Building as BuildingIcon } from 'lucide-vue-next'

const notify = inject('notify')

const departments = ref([
  { id: 1, name: 'Executive Shared Services', type: 'Core', color: 'indigo', memberCount: 12, description: 'Zambia-based group functions including HR, Finance, and IT.' },
  { id: 2, name: 'Risk & Compliance', type: 'Support', color: 'amber', memberCount: 5, description: 'Ensuring alignment with ZRA and Lusaka Stock Exchange requirements.' },
  { id: 3, name: 'CSR & Community', type: 'Strategic', color: 'emerald', memberCount: 8, description: 'ESG initiatives focused on Copperbelt and North-Western provinces.' }
])

const committees = ref([
  { id: 1, name: 'Audit', chair: 'Mutale Chanda', nextMeeting: 'Mar 28, 2026', color: 'rose' },
  { id: 2, name: 'Governance', chair: 'Lombe Mulenga', nextMeeting: 'Apr 05, 2026', color: 'cyan' },
  { id: 3, name: 'Remuneration', chair: 'Chanda Kapwepwe', nextMeeting: 'Apr 12, 2026', color: 'orange' }
])
</script>
