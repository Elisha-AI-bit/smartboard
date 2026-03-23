<template>
  <Teleport to="body">
    <Transition name="slide">
      <div v-if="show" class="drawer-overlay" @click.self="close">
        <div class="drawer-content">
          <header class="p-6 border-b flex justify-between items-center bg-slate-900 text-white">
            <h3 class="flex items-center gap-2">
              <SparklesIcon :size="20" class="text-amber-400" />
              AI Strategic Insights
            </h3>
            <button class="close-btn text-white/60 hover:text-white" @click="close">
              <XIcon :size="20" />
            </button>
          </header>
          
          <div class="drawer-body p-6 overflow-y-auto">
            <div class="flex flex-col gap-6">
              <!-- Insight Section -->
              <div v-for="insight in insights" :key="insight.id" class="p-4 rounded-xl border bg-slate-50">
                <div class="flex items-center gap-2 mb-2">
                  <span class="status-badge" :class="insight.type">
                    {{ insight.type.toUpperCase() }}
                  </span>
                  <span class="text-xs text-muted">{{ insight.date }}</span>
                </div>
                <h4 class="font-bold text-slate-900 mb-2">{{ insight.title }}</h4>
                <p class="text-sm text-slate-600 leading-relaxed mb-4">{{ insight.description }}</p>
                <div class="flex gap-2">
                  <button class="btn btn-outline btn-sm text-xs" @click="$emit('action', insight)">
                    Dismiss
                  </button>
                  <button class="btn btn-primary btn-sm text-xs" @click="$emit('action', insight)">
                    Apply Strategy
                  </button>
                </div>
              </div>

              <!-- Market Analysis Projections -->
              <div class="card p-4 border-dashed">
                <h4 class="text-sm font-bold mb-3 flex items-center gap-2">
                  <TrendingUpIcon :size="16" class="text-primary" />
                  Predictive Performance
                </h4>
                <div class="flex flex-col gap-3">
                  <div v-for="p in projections" :key="p.label" class="flex justify-between items-center text-xs">
                    <span class="text-muted">{{ p.label }}</span>
                    <span class="font-bold text-success">{{ p.value }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <footer class="p-6 border-t bg-slate-50">
            <button class="btn btn-primary w-full" @click="close">Close Sidebar</button>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { 
  Sparkles as SparklesIcon, 
  X as XIcon,
  TrendingUp as TrendingUpIcon
} from 'lucide-vue-next'

const props = defineProps({
  show: Boolean
})

const emit = defineEmits(['close', 'action'])

const close = () => emit('close')

const insights = [
  {
    id: 1,
    type: 'alert',
    date: '10 mins ago',
    title: 'Market Entry Risk: Vietnam',
    description: 'Recent regulatory changes in SE Asia impact planned data localization for the new regional hub. Mitigation suggested: Switch to regional cloud partnership.'
  },
  {
    id: 2,
    type: 'suggestion',
    date: '2 hours ago',
    title: 'Sustainability Index Boost',
    description: 'Linking executive compensation to the new ESG framework could improve your institutional investor rating by 15% based on current analyst models.'
  }
]

const projections = [
  { label: 'Q3 Revenue Target', value: '85% Probability' },
  { label: 'Operational Efficiency', value: '+12% Expected' },
  { label: 'Market Sentiment', value: 'Positive' }
]
</script>

<style scoped>
.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(15, 23, 42, 0.3);
  backdrop-filter: blur(2px);
  z-index: 2000;
  display: flex;
  justify-content: flex-end;
}

.drawer-content {
  width: 400px;
  max-width: 90%;
  height: 100%;
  background-color: white;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.drawer-body {
  flex: 1;
}

/* Animations */
.slide-enter-active, .slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-enter-from { transform: translateX(100%); opacity: 0; }
.slide-leave-to { transform: translateX(100%); opacity: 0; }

.status-badge.alert { background: #fee2e2; color: #ef4444; }
.status-badge.suggestion { background: #e0f2fe; color: #075985; }
</style>
