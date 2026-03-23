<template>
  <div class="strategy-view">
    <header class="flex justify-between items-center mb-8">
      <div>
        <h1>Strategic Planning</h1>
        <p class="text-muted">Align board decisions with organizational vision and long-term goals.</p>
      </div>
      <div class="flex gap-3">
        <button class="btn btn-outline" @click="notify('Exporting...', 'Generating strategic report...', 'info')">Export Report</button>
        <button class="btn btn-primary" @click="notify('Action Restricted', 'Objective creation is disabled in demo mode.', 'warning')">
          <PlusIcon :size="18" class="mr-2" />
          Add Objective
        </button>
      </div>
    </header>

    <!-- Strategy Overview Cards -->
    <div class="grid grid-cols-4 gap-6 mb-8">
      <div class="card text-center relative overflow-hidden">
        <div class="text-sm text-muted mb-1">Company Vision</div>
        <div class="font-medium italic">"Empowering global scale through intelligent governance."</div>
        <div class="absolute -right-2 -bottom-2 opacity-10 text-primary">
          <TargetIcon :size="64" />
        </div>
      </div>
      <div class="card text-center">
        <div class="text-sm text-muted mb-1">Active OKRs</div>
        <div class="text-2xl font-bold">18</div>
        <div class="text-xs text-success font-medium">↑ 2 from last month</div>
      </div>
      <div class="card text-center">
        <div class="text-sm text-muted mb-1">Total KPIs</div>
        <div class="text-2xl font-bold">42</div>
        <div class="text-xs text-muted">98% data accuracy</div>
      </div>
      <div class="card text-center">
        <div class="text-sm text-muted mb-1">Strategy Health</div>
        <div class="text-2xl font-bold text-success">92%</div>
        <div class="progress-bar mt-2 h-1.5">
          <div class="progress-fill on-track" style="width: 92%"></div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-8">
      <!-- Main Strategy Tracking -->
      <div class="col-span-2 flex flex-col gap-6">
        <div class="card">
          <div class="flex justify-between items-center mb-6">
            <h3>Strategic Goals & Initiatives</h3>
            <div class="flex gap-2">
              <div class="status-badge on-track">Active</div>
              <div class="status-badge at-risk">Review Needed</div>
            </div>
          </div>

          <div class="flex flex-col gap-6">
            <div v-for="goal in strategyGoals" :key="goal.id" class="goal-item p-6 border rounded-xl hover:border-primary transition-all">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <span class="badge mb-2" :class="`badge-${goal.color}`">{{ goal.category }}</span>
                  <h4 class="text-lg text-primary">{{ goal.title }}</h4>
                  <p class="text-sm text-muted">{{ goal.description }}</p>
                </div>
                <div class="flex flex-col items-end">
                  <div class="text-2xl font-bold">{{ goal.progress }}%</div>
                  <div class="text-xs text-muted">Progress</div>
                </div>
              </div>

              <div class="progress-bar mb-6">
                <div class="progress-fill" :class="goal.status" :style="{ width: goal.progress + '%', backgroundColor: `var(--${goal.color})` }"></div>
              </div>

              <div class="grid grid-cols-3 gap-4">
                <div v-for="kr in goal.keyResults" :key="kr.id" class="p-4 bg-slate-50 rounded-lg border border-dashed hover:border-solid hover:bg-white transition-all">
                  <div class="text-xs font-bold text-slate-500 uppercase mb-1">{{ kr.label }}</div>
                  <div class="flex items-center justify-between">
                    <div class="text-lg font-bold">{{ kr.value }}</div>
                    <div class="text-xs" :class="kr.trend === 'up' ? 'text-success' : 'text-danger'">
                      {{ kr.trend === 'up' ? '↑' : '↓' }} {{ kr.change }}%
                    </div>
                  </div>
                  <div class="text-xs text-muted mt-1">{{ kr.target }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- AI Insights & Risk Column -->
      <div class="flex flex-col gap-6">
        <div class="card bg-slate-900 text-white border-none shadow-xl">
          <div class="flex items-center gap-2 mb-4">
            <SparklesIcon :size="20" class="text-amber-400" />
            <h4 class="text-lg">AI Strategic Insights</h4>
          </div>
          <p class="text-xs text-slate-300 mb-4 leading-relaxed">
            AI has identified 2 new strategic risks and 1 optimization opportunity for your current OKRs.
          </p>
          <button class="btn btn-primary w-full text-xs py-2" @click="showDrawer = true">
            Open AI Insights Panel
          </button>
        </div>

        <div class="card">
          <!-- ... risk items ... -->
        </div>
      </div>
    </div>

    <!-- AI Drawer -->
    <AIInsightsDrawer :show="showDrawer" @close="showDrawer = false" @action="handleAIAction" />
  </div>
</template>

<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue'
import AIInsightsDrawer from '../components/AIInsightsDrawer.vue'
import { subscribeToObjectives } from '../services/firebaseService'
import { 
  Plus as PlusIcon, 
  Target as TargetIcon, 
  Sparkles as SparklesIcon,
  ShieldAlert as ShieldAlertIcon
} from 'lucide-vue-next'

const notify = inject('notify')
const showDrawer = ref(false)
const strategyGoals = ref([])
let unsubscribe = null

onMounted(() => {
  unsubscribe = subscribeToObjectives((data) => {
    strategyGoals.value = data.length > 0 ? data : defaultGoals
  })
})

onUnmounted(() => {
  if (unsubscribe) unsubscribe()
})

const handleAIAction = (insight) => {
  notify('AI Strategy Applied', `The recommendation for "${insight.title}" has been added to the board agenda.`, 'success')
  showDrawer.value = false
}

const defaultGoals = [
  {
    id: 1,
    title: 'Copperbelt Mining Expansion',
    category: 'Strategy',
    color: 'indigo',
    description: 'Optimize production at Konkola and Mopani mines using AI workflows.',
    progress: 65,
    status: 'on-track',
    keyResults: [
      { id: 1, label: 'Production Yield', value: '45,000 Tons', target: 'Target: 50k', trend: 'up', change: 5 },
      { id: 2, label: 'Local Job Creation', value: '1,200 New', target: 'Target: 1,500', trend: 'up', change: 200 }
    ]
  },
  {
    id: 2,
    title: 'Zambia Digital Transformation',
    category: 'Operations',
    color: 'cyan',
    description: 'Digitize 100% of board operations for government agencies and SOEs.',
    progress: 82,
    status: 'on-track',
    keyResults: [
      { id: 1, label: 'Agencies Onboarded', value: '12/15', target: 'Target: 15', trend: 'up', change: 3 },
      { id: 2, label: 'Efficiency Gain', value: '40%', target: 'Target: 50%', trend: 'up', change: 12 }
    ]
  }
]
</script>

<style scoped>
.col-span-2 { grid-column: span 2 / span 2; }
.goal-item:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
.bg-slate-50 { background-color: #f8fafc; }
.border-dashed { border-style: dashed; }
.bg-slate-900 { background-color: #0f172a; }
.bg-red-50 { background-color: #fef2f2; }
.bg-amber-50 { background-color: #fffbeb; }

.insight-item {
  transition: background-color 0.2s;
}
.insight-item:hover {
  background-color: rgba(255, 255, 255, 0.15);
}
</style>
