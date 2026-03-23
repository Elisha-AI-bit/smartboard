<template>
  <TransitionGroup name="toast" tag="div" class="toast-container">
    <div v-for="toast in toasts" :key="toast.id" 
         class="toast" :class="toast.type">
      <div class="toast-icon">
        <CheckCircleIcon v-if="toast.type === 'success'" :size="18" />
        <AlertCircleIcon v-else-if="toast.type === 'error'" :size="18" />
        <InfoIcon v-else :size="18" />
      </div>
      <div class="toast-content">
        <div class="toast-title">{{ toast.title }}</div>
        <div v-if="toast.message" class="toast-message">{{ toast.message }}</div>
      </div>
      <button class="toast-close" @click="removeToast(toast.id)">
        <XIcon :size="14" />
      </button>
    </div>
  </TransitionGroup>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { 
  CheckCircle as CheckCircleIcon, 
  AlertCircle as AlertCircleIcon, 
  Info as InfoIcon,
  X as XIcon
} from 'lucide-vue-next'

const toasts = ref([])

const addToast = (title, message = '', type = 'info', duration = 5000) => {
  const id = Date.now()
  toasts.value.push({ id, title, message, type })
  if (duration > 0) {
    setTimeout(() => removeToast(id), duration)
  }
}

const removeToast = (id) => {
  const index = toasts.value.findIndex(t => t.id === id)
  if (index !== -1) toasts.value.splice(index, 1)
}

// Expose the addToast function globally or via provide/inject
defineExpose({ addToast })
</script>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  z-index: 9999;
}

.toast {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 300px;
  padding: 1rem;
  background-color: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  border-left: 4px solid var(--primary);
  animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast.success { border-left-color: var(--success); }
.toast.error { border-left-color: var(--danger); }
.toast.info { border-left-color: var(--primary); }

.toast-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.success .toast-icon { color: var(--success); }
.error .toast-icon { color: var(--danger); }
.info .toast-icon { color: var(--primary); }

.toast-content {
  flex: 1;
}

.toast-title {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--text-main);
}

.toast-message {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 0.125rem;
}

.toast-close {
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  display: flex;
}

.toast-close:hover {
  background-color: var(--background);
  color: var(--text-main);
}

/* Animations */
@keyframes slideIn {
  from { opacity: 0; transform: translateX(100%); }
  to { opacity: 1; transform: translateX(0); }
}

.toast-enter-active, .toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from { opacity: 0; transform: translateX(30px); }
.toast-leave-to { opacity: 0; transform: translateX(100px); }
</style>
