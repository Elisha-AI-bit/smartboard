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
          <h2 class="text-3xl font-black mb-2">Sign In</h2>
          <p class="text-muted text-sm">Access your secure board environment</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div class="input-group">
            <label class="label">Corporate Email</label>
            <div class="input-wrapper">
              <MailIcon :size="18" class="input-icon" />
              <input 
                v-model="email" 
                type="email" 
                class="input-field"
                placeholder="e.g. j.mwila@company.zm"
              />
            </div>
          </div>

          <div class="input-group">
            <label class="label">Password</label>
            <div class="input-wrapper">
              <LockIcon :size="18" class="input-icon" />
              <input 
                v-model="password" 
                type="password" 
                class="input-field"
                placeholder="••••••••"
              />
            </div>
          </div>
          
          <div class="flex items-center justify-between text-xs font-bold">
            <label class="flex items-center gap-2 cursor-pointer text-muted hover:text-primary transition-colors">
              <input type="checkbox" class="checkbox" />
              <span>Remember this session</span>
            </label>
            <a href="#" class="text-primary hover:underline">Forgot Password?</a>
          </div>

          <button type="submit" class="btn btn-primary w-full py-4 text-sm font-bold shadow-lg">
            Authorize & Sign In
          </button>
        </form>

        <div class="mt-8 pt-8 border-t border-slate-100 text-center">
          <p class="text-sm text-muted">
            New to the platform? 
            <router-link to="/register" class="text-primary font-bold hover:underline">Request Access</router-link>
          </p>
        </div>
        
        <!-- Role Quick Switch (Dev Only) -->
        <div class="mt-8 flex gap-2 justify-center opacity-50 hover:opacity-100 transition-opacity">
          <button @click="email='admin@smartboard.zm'" class="dev-badge">Admin</button>
          <button @click="email='sec@smartboard.zm'" class="dev-badge">Secretary</button>
          <button @click="email='member@smartboard.zm'" class="dev-badge">Member</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { authStore } from '../../stores/auth'
import { Mail as MailIcon, Lock as LockIcon, ArrowLeft as ArrowLeftIcon } from 'lucide-vue-next'

const notify = inject('notify')
const router = useRouter()
const email = ref('')
const password = ref('')

const handleLogin = () => {
  if (!email.value) {
    notify('Missing Credentials', 'Please enter your Zambian corporate email.', 'warning');
    return;
  }
  
  let role = 'member'
  if (email.value.includes('admin')) role = 'admin'
  if (email.value.includes('sec')) role = 'secretary'
  
  authStore.init()
  authStore.login({ role })
  notify('Signed In', `Welcome back, ${authStore.user.name}`, 'success')
  router.push('/')
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

.checkbox {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1.5px solid var(--border);
  cursor: pointer;
}

.dev-badge {
  font-size: 9px;
  font-weight: 800;
  text-transform: uppercase;
  padding: 4px 8px;
  background: var(--border);
  border-radius: 6px;
  cursor: pointer;
  transition: var(--transition);
}

.dev-badge:hover {
  background: var(--primary);
  color: white;
}
</style>
