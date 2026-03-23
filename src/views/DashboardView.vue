<template>
  <div class="dashboard px-12 py-10 animate-fade-in">
    <header class="flex justify-between items-center mb-10">
      <div>
        <h1 class="text-3xl font-black mb-1">{{ dashboardTitle }}</h1>
        <p class="text-muted">Welcome back, <span class="text-primary font-bold">{{ authStore.user?.name }}</span>. Monitoring {{ orgContext }} status.</p>
      </div>
      <div class="flex gap-4">
        <button v-if="authStore.role === 'admin'" class="btn btn-outline" @click="notify('Security', 'Reviewing system health...', 'info')">
          <ShieldCheckIcon :size="18" class="mr-2" /> System Health
        </button>
        <button class="btn btn-primary shadow-lg" @click="$router.push('/meetings')">
          <CalendarIcon :size="18" class="mr-2" />
          {{ authStore.role === 'secretary' ? 'Schedule Meeting' : 'View Calendar' }}
        </button>
      </div>
    </header>

    <!-- KPI Summary Grid -->
    <div class="grid grid-cols-4 gap-6 mb-10">
      <div v-for="stat in currentStats" :key="stat.label" class="stat-card glass p-6">
        <div class="flex items-center justify-between mb-4">
          <div class="icon-circle" :class="`bg-${stat.color}`">
            <component :is="stat.icon" :size="20" />
          </div>
          <span class="trend-badge">{{ stat.trend }}</span>
        </div>
        <div>
          <div class="text-xs font-bold text-muted uppercase tracking-wider mb-1">{{ stat.label }}</div>
          <div class="text-3xl font-black">{{ stat.value }}</div>
        </div>
        <div class="status-chip mt-4" :class="`chip-${stat.color}`">
          {{ stat.subtext }}
        </div>
      </div>
    </div>

    <!-- Role-Specific Content -->
    <div class="grid grid-cols-12 gap-10">
      <!-- Main Activity Column -->
      <div class="col-span-12 lg:col-span-8">
        <div class="card glass p-8">
          <div class="flex justify-between items-center mb-8">
            <h3 class="font-bold text-xl">{{ mainSectionTitle }}</h3>
            <button class="text-primary text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
              View History <ChevronRightIcon :size="16" />
            </button>
          </div>

          <div class="space-y-4">
            <div v-for="doc in mainList" :key="doc.id" 
               @click="$router.push('/viewer')"
               class="doc-item glass flex items-center gap-4 p-4 border rounded-xl hover:bg-white/50 cursor-pointer">
              <div class="doc-icon shadow-sm">
                {{ doc.prefix || doc.id }}
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-1">
                  <span class="badge" :class="`badge-${doc.statusColor || 'indigo'}`">{{ doc.status || 'Active' }}</span>
                  <span class="text-sm font-bold text-slate-800">{{ doc.title }}</span>
                </div>
                <p class="text-xs text-muted line-clamp-1">{{ doc.subtitle }}</p>
              </div>
              <div class="text-right">
                <div class="text-[10px] font-bold text-muted uppercase mb-1">{{ doc.metaLabel }}</div>
                <div class="text-sm font-bold text-primary">{{ doc.metaValue }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Side Column -->
      <div class="col-span-12 lg:col-span-4">
        <div class="card p-8 bg-dark shadow-xl overflow-hidden relative">
          <div class="absolute -right-8 -top-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
          
          <h3 class="font-bold text-white text-xl mb-6 flex items-center gap-2">
            <SparklesIcon :size="20" class="text-primary" />
            AI Board Insights
          </h3>
          
          <div class="space-y-4 relative z-10">
            <div v-for="insight in insights" :key="insight.id" class="insight-item">
              <div class="flex items-center gap-2 mb-2">
                <div class="dot bg-primary"></div>
                <span class="text-[10px] font-black uppercase tracking-widest text-slate-400">{{ insight.type }}</span>
              </div>
              <p class="text-sm text-slate-300 font-medium leading-relaxed">{{ insight.text }}</p>
            </div>
            
            <button class="btn btn-primary w-full py-4 text-sm font-bold mt-4" @click="notify('AI Assistant', 'Analyzing latest board pack for strategic anomalies...', 'info')">
              Generate New Analysis
            </button>
          </div>
        </div>

        <div class="card glass p-8 mt-8 border-t-4 border-emerald-500">
          <h4 class="font-bold mb-6 flex items-center gap-2">
            <CalendarLinkIcon :size="18" class="text-emerald-500" />
            Today's Schedule
          </h4>
          <div class="space-y-6">
            <div class="schedule-item">
              <div class="time-box">10:00</div>
              <div>
                <div class="text-sm font-bold text-slate-900">Audit Committee</div>
                <div class="text-[10px] text-muted uppercase">Boardroom 402 / Zoom</div>
              </div>
            </div>
            <div class="schedule-item">
              <div class="time-box">14:30</div>
              <div>
                <div class="text-sm font-bold text-slate-900">ESG Policy Review</div>
                <div class="text-[10px] text-muted uppercase">Global Strategy Room</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue'
import { authStore } from '../stores/auth'
import { 
  Users as UsersIcon,
  ShieldCheck as ShieldCheckIcon,
  Calendar as CalendarIcon,
  Activity as ActivityIcon,
  Target as TargetIcon,
  CheckCircle as CheckCircleIcon,
  AlertTriangle as AlertTriangleIcon,
  Sparkles as SparklesIcon,
  ChevronRight as ChevronRightIcon,
  CalendarCheck as CalendarLinkIcon
} from 'lucide-vue-next'

const notify = inject('notify')

// Dynamic Titles
const dashboardTitle = computed(() => {
  if (authStore.role === 'admin') return 'System Administration'
  if (authStore.role === 'secretary') return 'Corporate Secretariat'
  return 'Board Member Dashboard'
})

const orgContext = computed(() => 'ZCCM-IH PLC') // Zambian Context

const mainSectionTitle = computed(() => {
  if (authStore.role === 'admin') return 'Recent System Activity'
  if (authStore.role === 'secretary') return 'Upcoming Board Sessions'
  return 'My Strategic Commitments'
})

// Dynamic Stats
const currentStats = computed(() => {
  if (authStore.role === 'admin') {
    return [
      { label: 'Active Users', value: '24', trend: '↑ 2', icon: UsersIcon, color: 'indigo', subtext: '92% Utilization' },
      { label: 'System Uptime', value: '99.9%', trend: 'Steady', icon: ActivityIcon, color: 'emerald', subtext: 'No Incidents' },
      { label: 'Auth Events', value: '142', trend: '↑ 12%', icon: ShieldCheckIcon, color: 'rose', subtext: 'Last 24h' },
      { label: 'Cloud Units', value: '8/12', trend: 'Normal', icon: ActivityIcon, color: 'cyan', subtext: 'Resource Usage' }
    ]
  }
  return [
    { label: 'Strategy OKRs', value: '12', trend: '↑ 5%', icon: TargetIcon, color: 'indigo', subtext: '8 On Track' },
    { label: 'Meetings', value: '4', trend: 'Next: Mar 25', icon: CalendarIcon, color: 'amber', subtext: '2 This Week' },
    { label: 'Decisions', value: '28', trend: '100% Secure', icon: CheckCircleIcon, color: 'emerald', subtext: 'Verified' },
    { label: 'Risk Level', value: 'Low', trend: 'Stable', icon: AlertTriangleIcon, color: 'cyan', subtext: '5 Tracked' }
  ]
})

// Dynamic Lists
const mainList = computed(() => {
  if (authStore.role === 'admin') {
    return [
      { id: 1, prefix: 'LOG', title: 'Admin Permission Change', subtitle: 'Mutale Chanda updated Mwila Phiri to Secretary role.', status: 'Security', statusColor: 'rose', metaLabel: 'Time', metaValue: '10m ago' },
      { id: 2, prefix: 'WEB', title: 'Vercel Deployment V2.4', subtitle: 'Automatic deployment of MVP UI updates.', status: 'System', statusColor: 'emerald', metaLabel: 'Status', metaValue: 'Success' },
      { id: 3, prefix: 'DB', title: 'Firestore Backup', subtitle: 'Daily backup of all board packs and minutes completed.', status: 'Data', statusColor: 'indigo', metaLabel: 'Size', metaValue: '1.2 GB' }
    ]
  }
  if (authStore.role === 'secretary') {
    return [
      { id: 1, prefix: 'SEC', title: 'Q1 Strategic Review', subtitle: 'Agenda finalized. Invitations sent to all members.', status: 'Published', statusColor: 'emerald', metaLabel: 'Date', metaValue: 'Mar 25' },
      { id: 2, prefix: 'AUD', title: 'Audit Committee Sitting', subtitle: 'Drafting minutes for the oversight session.', status: 'In Progress', statusColor: 'amber', metaLabel: 'Date', metaValue: 'Apr 02' },
      { id: 3, prefix: 'ESG', title: 'Annual ESG Disclosure', subtitle: 'Compiling board pack for public reporting.', status: 'Draft', statusColor: 'slate', metaLabel: 'Deadline', metaValue: 'May 15' }
    ]
  }
  return [
    { id: 1, prefix: 'OKR', title: 'Market Expansion Zambia', subtitle: 'Establish 5 new hubs in Southern Province.', status: 'On Track', statusColor: 'emerald', metaLabel: 'Progress', metaValue: '85%' },
    { id: 2, prefix: 'TASK', title: 'Approve FY25 Budget', subtitle: 'Review and sign off on consolidated group budget.', status: 'High Priority', statusColor: 'rose', metaLabel: 'Due', metaValue: 'Mar 28' },
    { id: 3, prefix: 'GOV', title: 'Governance Policy v2', subtitle: 'Review updated remote work protocols.', status: 'Pending', statusColor: 'amber', metaLabel: 'Status', metaValue: 'In Review' }
  ]
})

const insights = [
  { id: 1, type: 'Risk Alert', text: 'Decision on SE Asia expansion conflicts with current ESG policy v1.2. Recommend alignment review.' },
  { id: 2, type: 'Efficiency', text: 'Board pack reading time has decreased by 15% since implementing AI summaries. Good adoption.' },
  { id: 3, type: 'Opportunity', text: 'Current mining production trends in North-Western province suggest a budget surplus of 8% for Q3.' }
]
</script>

<style scoped>
.dashboard {
  background: var(--background);
  min-height: 100vh;
}

.stat-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid var(--border);
}

.icon-circle {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.bg-indigo { background: #6366f1; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2); }
.bg-emerald { background: #10b981; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2); }
.bg-rose { background: #f43f5e; box-shadow: 0 4px 12px rgba(244, 63, 94, 0.2); }
.bg-cyan { background: #06b6d4; box-shadow: 0 4px 12px rgba(6, 182, 212, 0.2); }
.bg-amber { background: #f59e0b; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2); }

.trend-badge {
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
}

.status-chip {
  font-size: 10px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 99px;
  width: fit-content;
}

.chip-indigo { background: rgba(99, 102, 241, 0.1); color: #4338ca; }
.chip-emerald { background: rgba(16, 185, 129, 0.1); color: #065f46; }
.chip-rose { background: rgba(244, 63, 94, 0.1); color: #9f1239; }
.chip-cyan { background: rgba(6, 182, 212, 0.1); color: #155e75; }
.chip-amber { background: rgba(245, 158, 11, 0.1); color: #92400e; }

.doc-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: white;
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  color: var(--primary);
  font-size: 0.8rem;
}

.doc-item {
  transition: var(--transition);
  border: 1px solid transparent;
}

.doc-item:hover {
  border-color: var(--primary);
  transform: translateX(4px);
}

.bg-dark {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
}

.insight-item {
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  transition: var(--transition);
}

.insight-item:hover {
  background: rgba(255, 255, 255, 0.06);
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.schedule-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.time-box {
  font-size: 10px;
  font-weight: 900;
  color: var(--text-muted);
  width: 40px;
  padding-top: 4px;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
</style>
