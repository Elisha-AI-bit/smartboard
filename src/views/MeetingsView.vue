<template>
  <div class="meetings-view animate-fade-in">
    <header class="flex justify-between items-end mb-8">
      <div>
        <h1 class="text-3xl mb-1">Meeting Management</h1>
        <p class="text-muted">Schedule, manage, and coordinate board and committee meetings.</p>
      </div>
      <button class="btn btn-primary" @click="showModal = true">
        <PlusIcon :size="18" class="mr-2" />
        Schedule Meeting
      </button>
    </header>

    <div class="grid grid-cols-3 gap-8">
      <!-- Meeting List -->
      <div class="col-span-2 flex flex-col gap-6">
        <div v-for="meeting in meetings" :key="meeting.id" 
             @click="$router.push(`/meetings/${meeting.id}`)"
             class="card hover:border-primary transition-all cursor-pointer p-6">
          <div class="flex justify-between items-start mb-6">
            <div>
              <div class="status-badge mb-3" :class="meeting.status">
                {{ meeting.statusLabel }}
              </div>
              <h3 class="text-xl font-bold mb-2">{{ meeting.title }}</h3>
              <div class="flex items-center gap-6 text-sm text-muted">
                <span class="flex items-center gap-1.5"><CalendarIcon :size="14" class="opacity-70" /> {{ meeting.date }}</span>
                <span class="flex items-center gap-1.5"><ClockIcon :size="14" class="opacity-70" /> {{ meeting.time }}</span>
                <span class="flex items-center gap-1.5"><MapPinIcon :size="14" class="opacity-70" /> {{ meeting.location }}</span>
              </div>
            </div>
            <div class="flex -space-x-2">
              <div v-for="i in 3" :key="i" class="w-9 h-9 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 shadow-sm">
                {{ ['JD', 'SM', 'RF'][i-1] }}
              </div>
              <div class="w-9 h-9 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-400 shadow-sm">
                +5
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between pt-5 border-t">
            <div class="flex gap-6">
              <span class="text-xs font-semibold text-slate-500 flex items-center gap-2">
                <FileTextIcon :size="15" class="text-primary opacity-70" /> {{ meeting.docsCount }} Documents
              </span>
              <span class="text-xs font-semibold text-slate-500 flex items-center gap-2">
                <MessageSquareIcon :size="15" class="text-primary opacity-70" /> {{ meeting.commentsCount }} Comments
              </span>
            </div>
            <button class="btn btn-outline btn-sm px-4">View Board Pack</button>
          </div>
        </div>
      </div>

      <!-- Calendar/Quick Actions -->
      <div class="flex flex-col gap-8">
        <div class="card p-6">
          <h4 class="mb-5 text-sm uppercase tracking-wider text-slate-400 font-bold">Upcoming Deadlines</h4>
          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-4 text-sm bg-slate-50 p-3 rounded-lg border border-transparent hover:border-slate-100 transition-all">
              <div class="w-2.5 h-2.5 rounded-full bg-red-500"></div>
              <div class="flex-1 font-medium">RSVP for Q1 Strategy Review</div>
              <div class="text-[10px] font-bold text-slate-400">TODAY</div>
            </div>
            <div class="flex items-center gap-4 text-sm bg-slate-50 p-3 rounded-lg border border-transparent hover:border-slate-100 transition-all">
              <div class="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
              <div class="flex-1 font-medium">Submit Audit Comments</div>
              <div class="text-[10px] font-bold text-slate-400">TOMORROW</div>
            </div>
          </div>
        </div>

        <div class="card bg-primary p-6 text-white border-none shadow-xl relative overflow-hidden">
          <div class="relative z-10">
            <h4 class="mb-2 text-white font-bold">AI Meeting Assistant</h4>
            <p class="text-xs text-indigo-100 mb-6 opacity-90 leading-relaxed">Let AI suggest agenda items based on previous decisions and current OKRs.</p>
            <button class="btn bg-white text-primary w-full text-sm font-bold shadow-lg hover:scale-[1.02]">Draft Agenda</button>
          </div>
          <div class="absolute -right-4 -bottom-4 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
        </div>
      </div>
    </div>

    <!-- Create Meeting Modal -->
    <Modal :show="showModal" title="Schedule New Board Meeting" @close="showModal = false">
      <form @submit.prevent="handleCreateMeeting" class="flex flex-col gap-4">
        <div class="form-group">
          <label class="text-sm font-medium mb-1 block">Meeting Title</label>
          <input v-model="newMeeting.title" type="text" class="w-full p-2 border rounded-lg focus:border-primary outline-none" placeholder="e.g. Q2 Strategy Review" required />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="form-group">
            <label class="text-sm font-medium mb-1 block">Date</label>
            <input v-model="newMeeting.date" type="date" class="w-full p-2 border rounded-lg focus:border-primary outline-none" required />
          </div>
          <div class="form-group">
            <label class="text-sm font-medium mb-1 block">Time</label>
            <input v-model="newMeeting.time" type="time" class="w-full p-2 border rounded-lg focus:border-primary outline-none" required />
          </div>
        </div>
        <div class="form-group">
          <label class="text-sm font-medium mb-1 block">Location / Link</label>
          <input v-model="newMeeting.location" type="text" class="w-full p-2 border rounded-lg focus:border-primary outline-none" placeholder="Boardroom A or Zoom Link" />
        </div>
        <div class="form-group">
          <label class="text-sm font-medium mb-1 block">Committees</label>
          <div class="flex flex-wrap gap-2">
            <span v-for="c in committees" :key="c.name" 
                  @click="toggleCommittee(c.name)"
                  class="text-xs px-3 py-1 border rounded-full cursor-pointer transition-colors"
                  :class="newMeeting.committees.includes(c.name) ? `badge-${c.color}` : 'hover:bg-slate-50'">
              {{ c.name }}
            </span>
          </div>
        </div>
        <p v-if="!isFormValid && (newMeeting.title || newMeeting.date)" class="text-[10px] text-danger mt-1">
          * Please fill in title, date, and time.
        </p>
      </form>
      <template #footer>
        <button class="btn btn-outline" @click="showModal = false">Cancel</button>
        <button class="btn btn-primary" :disabled="!isFormValid" @click="handleCreateMeeting">
          Schedule Meeting
        </button>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, inject, computed, onMounted, onUnmounted } from 'vue'
import Modal from '../components/Modal.vue'
import { subscribeToMeetings, createMeeting } from '../services/firebaseService'
import { 
  Plus as PlusIcon, 
  Calendar as CalendarIcon, 
  Clock as ClockIcon, 
  MapPin as MapPinIcon,
  FileText as FileTextIcon,
  MessageSquare as MessageSquareIcon
} from 'lucide-vue-next'

const notify = inject('notify')
const committees = [
  { name: 'Audit', color: 'amber' },
  { name: 'Strategy', color: 'cyan' },
  { name: 'ESG', color: 'emerald' },
  { name: 'Nomination', color: 'indigo' },
  { name: 'Risk', color: 'orange' }
]
const showModal = ref(false)

const newMeeting = ref({
  title: '',
  date: '',
  time: '',
  location: '',
  committees: []
})

let unsubscribe = null

onMounted(() => {
  unsubscribe = subscribeToMeetings((data) => {
    meetings.value = data
  })
})

onUnmounted(() => {
  if (unsubscribe) unsubscribe()
})

const isFormValid = computed(() => {
  return newMeeting.value.title.trim() !== '' && 
         newMeeting.value.date !== '' && 
         newMeeting.value.time !== ''
})

const toggleCommittee = (c) => {
  const index = newMeeting.value.committees.indexOf(c)
  if (index === -1) newMeeting.value.committees.push(c)
  else newMeeting.value.committees.splice(index, 1)
}

const meetings = ref([
  { 
    id: 1, 
    title: 'ZCCM-IH Q1 Performance Review', 
    date: 'Mar 25, 2026', 
    time: '10:00 AM - 12:30 PM', 
    location: 'Boardroom A / Zoom', 
    status: 'info', 
    statusLabel: 'Upcoming',
    docsCount: 12,
    commentsCount: 5
  },
  { 
    id: 2, 
    title: 'Audit & Risk Committee (Lafarge Zambia)', 
    date: 'Apr 02, 2026', 
    time: '02:00 PM - 04:00 PM', 
    location: 'Executive Lounge', 
    status: 'info', 
    statusLabel: 'Scheduled',
    docsCount: 8,
    commentsCount: 2
  },
  { 
    id: 3, 
    title: 'NATSAVE Annual General Meeting', 
    date: 'May 15, 2026', 
    time: '09:00 AM - 05:00 PM', 
    location: 'Mulungushi Int. Conf. Centre', 
    status: 'warning', 
    statusLabel: 'Draft',
    docsCount: 0,
    commentsCount: 0
  }
])
</script>

<style scoped>
.btn-sm { padding: 0.25rem 0.75rem; font-size: 0.8125rem; }
.btn-outline { background: transparent; border: 1px solid var(--border); color: var(--text-main); }
.btn-outline:hover { background: var(--background); border-color: var(--secondary); }
</style>
