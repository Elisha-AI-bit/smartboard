<template>
  <div class="meeting-detail">
    <nav class="flex items-center gap-2 mb-6 text-sm">
      <router-link to="/meetings" class="text-primary hover:underline">Meetings</router-link>
      <ChevronRightIcon :size="14" class="text-muted" />
      <span class="text-muted">Q1 Strategic Review</span>
    </nav>

    <header class="flex justify-between items-start mb-8">
      <div>
        <div class="flex items-center gap-3 mb-2">
          <h1 class="text-3xl">Q1 Strategic Review</h1>
          <span class="status-badge info">Upcoming</span>
        </div>
        <div class="flex items-center gap-6 text-slate-500">
          <div class="flex items-center gap-2"><CalendarIcon :size="18" /> Mar 25, 2026</div>
          <div class="flex items-center gap-2"><ClockIcon :size="18" /> 10:00 AM - 12:30 PM</div>
          <div class="flex items-center gap-2"><MapPinIcon :size="18" /> Boardroom A / Zoom</div>
        </div>
      </div>
      <div class="flex gap-3">
        <button class="btn btn-outline">
          <ShareIcon :size="18" class="mr-2" /> Share
        </button>
        <button class="btn btn-primary">
          <DownloadIcon :size="18" class="mr-2" /> Download Board Book
        </button>
      </div>
    </header>

    <div class="grid grid-cols-12 gap-8">
      <!-- Left Column: Agenda & Details -->
      <div class="col-span-8 flex flex-col gap-8">
        <!-- Tabs -->
        <div class="flex border-b">
          <button v-for="tab in tabs" :key="tab" 
                  @click="activeTab = tab"
                  class="px-6 py-3 font-medium transition-colors border-b-2"
                  :class="activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-muted hover:text-main'">
            {{ tab }}
          </button>
        </div>

        <div v-if="activeTab === 'Agenda'">
          <AgendaBuilder />
        </div>
        
        <div v-else-if="activeTab === 'Minutes'" class="card">
          <div class="flex justify-between items-center mb-4">
            <h3>Meeting Minutes</h3>
            <button class="btn btn-outline btn-sm">Auto-Draft with AI</button>
          </div>
          <textarea class="w-full h-64 p-4 border rounded-lg focus:border-primary outline-none" placeholder="Start recording minutes..."></textarea>
        </div>

        <div v-else class="card flex items-center justify-center py-20 text-muted">
          Content for {{ activeTab }} will be here.
        </div>
      </div>

      <!-- Right Column: Sidebar info -->
      <div class="col-span-4 flex flex-col gap-6">
        <div class="card">
          <h4 class="mb-4">Attendees (12)</h4>
          <div class="flex flex-col gap-3">
            <div v-for="user in attendees" :key="user.name" class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                  {{ user.initials }}
                </div>
                <div>
                  <div class="text-sm font-medium">{{ user.name }}</div>
                  <div class="text-xs text-muted">{{ user.role }}</div>
                </div>
              </div>
              <div v-if="user.rsvp" class="status-badge on-track text-[10px]">RSVPed</div>
              <div v-else class="status-badge text-[10px] bg-slate-100 text-slate-500">Pending</div>
            </div>
          </div>
        </div>

        <div class="card">
          <h4 class="mb-4">Board Decisions & Actions</h4>
          <div class="flex flex-col gap-4">
            <div class="p-3 bg-slate-50 rounded-lg border">
              <div class="text-xs font-bold text-primary mb-1">DECISION REQD</div>
              <div class="text-sm font-medium">Approve FY27 Budget Proposal</div>
            </div>
            <div class="p-3 bg-slate-50 rounded-lg border border-dashed">
              <div class="text-xs font-bold text-amber-600 mb-1">ACTION ITEM</div>
              <div class="text-sm font-medium">Review Risk Registry Compliance</div>
              <div class="text-xs text-muted mt-1">Assigned to: Sarah Miller</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  ChevronRight as ChevronRightIcon,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  MapPin as MapPinIcon,
  Share2 as ShareIcon,
  Download as DownloadIcon
} from 'lucide-vue-next'
import AgendaBuilder from '../components/AgendaBuilder.vue'

const activeTab = ref('Agenda')
const tabs = ['Agenda', 'Minutes', 'Documents', 'Voting', 'Analytics']

const attendees = [
  { name: 'John Doe', role: 'Chairman', initials: 'JD', rsvp: true },
  { name: 'Sarah Miller', role: 'CEO', initials: 'SM', rsvp: true },
  { name: 'Robert Fox', role: 'CFO', initials: 'RF', rsvp: true },
  { name: 'Dr. Emily Davis', role: 'Non-Exec Director', initials: 'ED', rsvp: false },
  { name: 'James Chen', role: 'COO', initials: 'JC', rsvp: true }
]
</script>

<style scoped>
.col-span-8 { grid-column: span 8 / span 8; }
.col-span-4 { grid-column: span 4 / span 4; }
.meeting-detail { animation: fadeIn 0.3s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>
