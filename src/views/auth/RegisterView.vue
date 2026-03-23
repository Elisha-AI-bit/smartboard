<template>
  <div class="min-h-screen bg-mesh flex items-center justify-center p-6 animate-fade-in">
    <div class="w-full max-w-md">
      <!-- Back to Landing -->
      <router-link to="/welcome" class="flex items-center gap-2 text-sm text-muted mb-8 hover:text-primary transition-all group">
        <ArrowLeftIcon :size="16" class="group-hover:-translate-x-1 transition-transform" />
        Back to SmartBoard
      </router-link>

      <div class="card glass p-10 shadow-xl">
        <div class="text-center mb-10">
          <div class="logo-box mx-auto mb-6">S</div>
          <h2 class="text-3xl font-black mb-2">Request Access</h2>
          <p class="text-muted text-sm">Join Zambia's leading board network</p>
        </div>

        <form @submit.prevent="handleRegister" class="space-y-6">
          <div class="input-group">
            <label class="label">Full Name</label>
            <div class="input-wrapper">
              <UserIcon :size="18" class="input-icon" />
              <input 
                v-model="name" 
                type="text" 
                class="input-field"
                placeholder="e.g. Mwila Phiri"
              />
            </div>
          </div>

          <div class="input-group">
            <label class="label">Organization</label>
            <div class="input-wrapper">
              <BuildingIcon :size="18" class="input-icon" />
              <input 
                v-model="org" 
                type="text" 
                class="input-field"
                placeholder="e.g. ZCCM-IH PLC"
              />
            </div>
          </div>

          <div class="input-group">
            <label class="label">Corporate Email</label>
            <div class="input-wrapper">
              <MailIcon :size="18" class="input-icon" />
              <input 
                v-model="email" 
                type="email" 
                class="input-field"
                placeholder="e.g. m.phiri@company.zm"
              />
            </div>
          </div>

          <button type="submit" class="btn btn-primary w-full py-4 text-sm font-bold shadow-lg mt-4">
            Submit Registration Request
          </button>
        </form>

        <div class="mt-8 pt-8 border-t border-slate-100 text-center">
          <p class="text-sm text-muted">
            Already have an account? 
            <router-link to="/login" class="text-primary font-bold hover:underline">Sign In</router-link>
          </p>
        </div>
      </div>
      
      <p class="text-[10px] text-center text-muted mt-8 leading-relaxed max-w-xs mx-auto">
        By submitting, you agree to SmartBoard's <a href="#" class="underline">Terms of Governance</a> and <a href="#" class="underline">Security Protocols</a>.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { User as UserIcon, Building as BuildingIcon, Mail as MailIcon, ArrowLeft as ArrowLeftIcon } from 'lucide-vue-next'

const notify = inject('notify')
const router = useRouter()

const name = ref('')
const org = ref('')
const email = ref('')

const handleRegister = () => {
  if (!name.value || !email.value) {
    notify('Missing Information', 'Please complete all required fields.', 'warning')
    return
  }
  
  notify('Request Received', 'Our team will verify your credentials shortly.', 'success')
  router.push('/login')
}
</script>

<style scoped>
.logo-box {
  width: 56px;
  height: 56px;
  background: var(--primary);
  color: white;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 1.75rem;
  box-shadow: 0 8px 16px var(--primary-glow);
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.label {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-main);
  padding-left: 0.25rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 1rem;
  color: var(--text-muted);
  pointer-events: none;
}

.input-field {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--background);
  font-family: inherit;
  font-size: 0.9rem;
  transition: var(--transition);
}

.input-field:focus {
  outline: none;
  border-color: var(--primary);
  background: white;
  box-shadow: 0 0 0 4px var(--primary-glow);
}
</style>
