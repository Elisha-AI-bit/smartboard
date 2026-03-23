  <div class="tasks-view animate-fade-in">
    <header class="flex justify-between items-end mb-10">
      <div>
        <h1 class="text-3xl mb-1">Tasks & Decisions</h1>
        <p class="text-muted">Track board resolutions, voting outcomes, and assigned action items.</p>
      </div>
      <div class="flex gap-4">
        <button class="btn btn-outline px-6" @click="notify('Log Accessed', 'Opening the historic resolution log...', 'info')">Resolution Log</button>
        <button class="btn btn-primary px-6" @click="notify('Action Restricted', 'Task creation is managed by the Company Secretary.', 'warning')">
          <PlusIcon :size="18" class="mr-2" /> New Task
        </button>
      </div>
    </header>

    <div class="grid grid-cols-12 gap-10">
      <!-- Left Column: Tasks -->
      <div class="col-span-12 lg:col-span-8 flex flex-col gap-8">
        <div class="flex border-b mb-2">
          <button v-for="tab in ['Active Tasks', 'Completed', 'Archived']" :key="tab" 
                  @click="activeTaskTab = tab"
                  class="px-8 py-4 font-bold text-sm transition-all border-b-2 uppercase tracking-widest"
                  :class="activeTaskTab === tab ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600'">
            {{ tab }}
          </button>
        </div>

        <div class="flex flex-col gap-4">
          <div v-for="task in tasks" :key="task.id" class="card hover:shadow-lg transition-all group p-6 border-slate-100 hover:border-primary/50">
            <div class="flex items-start gap-5">
              <div class="pt-1">
                <div @click="task.completed = !task.completed" 
                     class="w-6 h-6 rounded-lg border-2 cursor-pointer flex items-center justify-center transition-all bg-white"
                     :class="task.completed ? 'bg-accent border-accent' : 'border-slate-200 hover:border-primary'">
                  <CheckIcon v-if="task.completed" :size="14" class="text-white" />
                </div>
              </div>
              <div class="flex-1">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h4 class="text-lg font-bold text-slate-800 leading-snug" :class="{ 'line-through text-slate-400 font-medium': task.completed }">{{ task.title }}</h4>
                    <p class="text-sm text-muted mt-1.5 leading-relaxed">{{ task.description }}</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="badge px-3 py-1 text-[10px]" :class="`badge-${task.priority === 'high' ? 'rose' : task.priority === 'medium' ? 'amber' : 'slate'}`">
                      {{ task.priority.toUpperCase() }}
                    </span>
                  </div>
                </div>
                <div class="flex items-center justify-between mt-6 pt-5 border-t border-slate-50">
                  <div class="flex gap-6 text-xs font-semibold text-slate-500">
                    <span class="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full"><CalendarIcon :size="13" class="text-primary" /> Due: {{ task.dueDate }}</span>
                    <span class="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full"><UserIcon :size="13" class="text-primary" /> {{ task.assignee }}</span>
                  </div>
                  <div class="flex gap-2">
                    <button class="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors" @click="notify('Comments', 'Retrieving task discussion thread...', 'info')">
                      <MessageSquareIcon :size="16" />
                    </button>
                    <button class="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors" @click="notify('Options', 'Opening task management options...', 'info')">
                      <MoreHorizontalIcon :size="16" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Voting & Decisions -->
      <div class="col-span-12 lg:col-span-4 flex flex-col gap-8">
        <div class="card bg-slate-50 border-slate-200 p-6 overflow-hidden relative">
          <h3 class="mb-6 flex items-center gap-3 text-lg font-bold text-slate-800">
            <VoteIcon :size="24" class="text-primary" />
            Active Voting
          </h3>
          <div class="flex flex-col gap-5 relative z-10">
            <div v-for="vote in activeVotes" :key="vote.id" class="p-5 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div class="text-[10px] font-black text-primary mb-2 tracking-tighter uppercase">BALLOT #{{ vote.id }}</div>
              <div class="text-sm font-bold text-slate-900 mb-4 leading-snug">{{ vote.title }}</div>
              
              <div class="flex flex-col gap-2 mb-5">
                <div class="flex justify-between text-[11px] font-bold text-slate-500 mb-1">
                  <span>YES ({{ vote.yes }}%)</span>
                  <span>NO ({{ vote.no }}%)</span>
                </div>
                <div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
                  <div class="h-full bg-accent" :style="{ width: vote.yes + '%' }"></div>
                  <div class="h-full bg-rose-500" :style="{ width: vote.no + '%' }"></div>
                </div>
              </div>

              <div class="flex gap-3">
                <button class="btn btn-outline btn-sm flex-1 text-[11px] font-bold py-2.5" @click="notify('Abstention', 'Your abstention has been recorded.', 'info')">Abstain</button>
                <button class="btn btn-primary btn-sm flex-1 text-[11px] font-bold py-2.5 shadow-md" @click="notify('Vote Cast', 'Your vote for Resolution #' + vote.id + ' has been secured.', 'success')">Vote Now</button>
              </div>
            </div>
          </div>
          <button class="btn btn-outline w-full mt-6 text-xs font-bold py-3 uppercase tracking-widest border-slate-200" @click="notify('Archive', 'Loading historic resolutions...', 'info')">View Past Resolutions</button>
        </div>

        <div class="card p-6">
          <h4 class="mb-6 text-sm uppercase tracking-wider text-slate-400 font-bold">Recent Decisions</h4>
          <div class="flex flex-col gap-5">
            <div class="decision-item flex gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors">
              <div class="w-1.5 h-auto bg-accent rounded-full border border-white"></div>
              <div>
                <div class="text-[10px] font-bold text-slate-400 uppercase mb-1">Mar 15, 2026</div>
                <div class="text-sm font-bold text-slate-800">Approved: Asia Expansion Phase 1</div>
                <div class="text-xs text-muted mt-0.5">Resolution #128 • 12 Yes / 0 No</div>
              </div>
            </div>
            <div class="decision-item flex gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors">
              <div class="w-1.5 h-auto bg-accent rounded-full border border-white"></div>
              <div>
                <div class="text-[10px] font-bold text-slate-400 uppercase mb-1">Mar 12, 2026</div>
                <div class="text-sm font-bold text-slate-800">Approved: CFO Appointment</div>
                <div class="text-xs text-muted mt-0.5">Resolution #127 • 10 Yes / 2 No</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue'
import { subscribeToTasks, subscribeToBallots, castVote } from '../services/firebaseService'
import { 
  Plus as PlusIcon, 
  Check as CheckIcon,
  Calendar as CalendarIcon,
  User as UserIcon,
  MessageSquare as MessageSquareIcon,
  MoreHorizontal as MoreHorizontalIcon,
  Vote as VoteIcon
} from 'lucide-vue-next'

const notify = inject('notify')
const activeTaskTab = ref('Active Tasks')
const tasks = ref([])
const activeVotes = ref([])
let unsubscribeTasks = null
let unsubscribeBallots = null

onMounted(() => {
  unsubscribeTasks = subscribeToTasks((data) => {
    tasks.value = data.length > 0 ? data : defaultTasks
  })
  unsubscribeBallots = subscribeToBallots((data) => {
    activeVotes.value = data.length > 0 ? data : defaultVotes
  })
})

onUnmounted(() => {
  if (unsubscribeTasks) unsubscribeTasks()
  if (unsubscribeBallots) unsubscribeBallots()
})

const handleVote = async (ballotId, option) => {
  try {
    await castVote(ballotId, option)
    notify('Vote Cast', `Your vote for Resolution #${ballotId} has been secured.`, 'success')
  } catch (err) {
    notify('Error', 'Failed to cast vote. Please try again.', 'danger')
  }
}

const defaultTasks = [
  { id: 1, title: 'Approve FY26 ZESCO Tariff Adjustment', priority: 'high', dueDate: 'Mar 28', assignee: 'Mutale Chanda', description: 'Review the proposed ZRA-aligned tariff restructuring for industrial users.' },
  { id: 2, title: 'Finalize Bank of Zambia Compliance Pack', priority: 'medium', dueDate: 'Apr 05', assignee: 'Mwila Phiri', description: 'Ensure all AML/KYC documentations are up to date for the central bank audit.' }
]

const defaultVotes = [
  { id: 1042, title: 'Adopt Remote Work Governance Policy v2.0', yes: 75, no: 15, abstain: 10 },
  { id: 1043, title: 'Authorize Budget for Cyber-Risk Mitigation Project', yes: 90, no: 0, abstain: 10 }
]
</script>

<style scoped>
.col-span-12 { grid-column: span 12 / span 12; }
@media (min-width: 1024px) {
  .lg\:col-span-8 { grid-column: span 8 / span 8; }
  .lg\:col-span-4 { grid-column: span 4 / span 4; }
}

.high { background-color: #fee2e2; color: #ef4444; }
.medium { background-color: #fff7ed; color: #f59e0b; }
.low { background-color: #f1f5f9; color: #64748b; }

.decision-item { animation: slideIn 0.3s ease-out; }
@keyframes slideIn { from { opacity: 0; transform: translateX(10px); } to { opacity: 1; transform: translateX(0); } }
</style>
