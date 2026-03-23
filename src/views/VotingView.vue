<template>
  <div class="voting-screen animate-fade-in">
    <header class="flex justify-between items-end mb-8">
      <div>
        <h1 class="text-3xl mb-1">Secure Voting</h1>
        <p class="text-muted">Cast your vote on board resolutions with blockchain-level security and transparency.</p>
      </div>
      <div class="flex items-center gap-3 px-5 py-2.5 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 shadow-sm">
        <ShieldCheckIcon :size="20" />
        <span class="text-[11px] font-black uppercase tracking-widest">Verified Secure</span>
      </div>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div v-for="ballot in ballots" :key="ballot.id" 
           class="card p-8 border-t-8 transition-all hover:shadow-2xl hover:-translate-y-1" 
           :class="`border-${ballot.color}-500 shadow-xl shadow-${ballot.color}-100/20`">
        <div class="flex justify-between items-start mb-8">
          <span class="badge px-4 py-1.5 text-[10px]" :class="`badge-${ballot.color}`">{{ ballot.category }}</span>
          <span class="text-[10px] font-bold text-slate-400 tracking-tighter uppercase">BALLOT ID: {{ ballot.id }}</span>
        </div>
        
        <h3 class="text-2xl font-black text-slate-900 mb-5 leading-tight">{{ ballot.title }}</h3>
        <p class="text-sm text-slate-600 mb-10 leading-relaxed opacity-80">{{ ballot.description }}</p>

        <!-- Voting Options -->
        <div v-if="!ballot.voted" class="space-y-4">
          <button 
            v-for="opt in ['Approve', 'Reject', 'Abstain']" 
            :key="opt"
            @click="handleVote(ballot, opt)"
            class="w-full py-5 px-8 rounded-2xl border-2 border-slate-100 hover:border-primary hover:bg-slate-50 font-bold transition-all text-left flex justify-between items-center group shadow-sm hover:shadow-md"
          >
            <span class="group-hover:text-primary transition-colors text-base">{{ opt }}</span>
            <CircleIcon :size="18" class="text-slate-300 group-hover:text-primary transition-all group-hover:scale-110" />
          </button>
        </div>

        <!-- Results View -->
        <div v-else class="space-y-6">
          <div class="text-center py-5 bg-slate-50 rounded-2xl mb-8 border border-dashed border-slate-200">
            <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Your Vote: </span>
            <span class="text-base font-black text-primary uppercase ml-2 tracking-tight">{{ ballot.myVote }}</span>
          </div>
          <div v-for="res in ballot.results" :key="res.label" class="space-y-2">
            <div class="flex justify-between text-xs font-black text-slate-600 mb-1 uppercase tracking-tighter">
              <span>{{ res.label }}</span>
              <span class="text-slate-400">{{ res.percent }}%</span>
            </div>
            <div class="w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
              <div class="h-full rounded-full transition-all duration-1000 shadow-sm" :style="{ width: res.percent + '%', backgroundColor: res.color }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { ShieldCheck as ShieldCheckIcon, Circle as CircleIcon } from 'lucide-vue-next'

const notify = inject('notify')

const ballots = ref([
  { 
    id: 'RES-ZM-001', 
    title: 'Acquisition of TechFlow Systems (Zambia)', 
    description: 'Proposed acquisition of 100% shareholding in TechFlow Systems Ltd to enhance our digital banking infrastructure.', 
    category: 'Expansion', 
    color: 'indigo',
    voted: false,
    myVote: '',
    results: [
      { label: 'Approve', percent: 65, color: '#10b981' },
      { label: 'Reject', percent: 15, color: '#ef4444' },
      { label: 'Abstain', percent: 20, color: '#64748b' }
    ]
  },
  { 
    id: 'RES-ZM-002', 
    title: 'Dividend Distribution Policy Update', 
    description: 'Revision of the dividend payout ratio to 45% of PAT for the fiscal year 2026.', 
    category: 'Finance', 
    color: 'emerald',
    voted: true,
    myVote: 'Approve',
    results: [
      { label: 'Approve', percent: 82, color: '#10b981' },
      { label: 'Reject', percent: 8, color: '#ef4444' },
      { label: 'Abstain', percent: 10, color: '#64748b' }
    ]
  }
])

const handleVote = (ballot, option) => {
  ballot.voted = true
  ballot.myVote = option
  notify('Vote Secured', `Your ${option} vote for ${ballot.id} has been encrypted and cast.`, 'success')
}
</script>
