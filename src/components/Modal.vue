<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="show" class="modal-overlay" @click.self="close">
        <Transition name="zoom">
          <div v-if="show" class="modal-content" :style="{ maxWidth: width }">
            <header class="modal-header flex flex-col p-8 border-b relative">
              <h3 class="modal-title">{{ title }}</h3>
              <p v-if="subtitle" class="text-xs text-muted mt-1">{{ subtitle }}</p>
              <button class="close-btn absolute right-6 top-8" @click="close">
                <XIcon :size="20" />
              </button>
            </header>
            <div class="modal-body p-8 space-y-6">
              <slot></slot>
            </div>
            <footer v-if="$slots.footer" class="modal-footer p-8 border-t flex justify-end gap-4">
              <slot name="footer"></slot>
            </footer>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { X as XIcon } from 'lucide-vue-next'

const props = defineProps({
  show: Boolean,
  title: String,
  subtitle: String,
  width: {
    type: String,
    default: '500px'
  }
})

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(15, 23, 42, 0.4); /* Slate 900 with opacity */
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  width: 90%;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  max-height: 90vh;
}

.modal-header {
  flex-shrink: 0;
}

.modal-title {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-main);
}

.close-btn {
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
}

.close-btn:hover {
  background-color: var(--background);
  color: var(--text-main);
}

.modal-body {
  overflow-y: auto;
  flex: 1;
}

.modal-footer {
  flex-shrink: 0;
}

/* Transitions */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.zoom-enter-active, .zoom-leave-active { transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
.zoom-enter-from { opacity: 0; transform: scale(0.95) translateY(10px); }
.zoom-leave-to { opacity: 0; transform: scale(0.95); }
</style>
