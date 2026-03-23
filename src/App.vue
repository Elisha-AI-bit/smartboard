<template>
  <div class="app-wrapper">
    <!-- Public Layout (Landing, Login, Register) -->
    <div v-if="!authStore.isAuthenticated" class="public-container">
      <router-view />
    </div>

    <!-- Authenticated Layout -->
    <div v-else class="app-layout">
      <!-- Sidebar -->
      <aside class="sidebar" :class="{ collapsed: isCollapsed }">
        <div class="logo-container flex items-center gap-3 p-6 mb-2">
          <div class="logo-box">S</div>
          <span v-if="!isCollapsed" class="logo-text">SmartBoard</span>
        </div>

        <nav class="sidebar-nav">
          <!-- Shared Links -->
          <router-link to="/" class="nav-item nav-dashboard">
            <LayoutDashboardIcon :size="20" />
            <span v-if="!isCollapsed">Dashboard</span>
          </router-link>

          <!-- Admin Specific -->
          <template v-if="authStore.role === 'admin'">
            <div v-if="!isCollapsed" class="nav-section-title">Administration</div>
            <router-link to="/users" class="nav-item nav-users">
              <UsersIcon :size="20" />
              <span v-if="!isCollapsed">User Management</span>
            </router-link>
            <router-link to="/organization" class="nav-item nav-org">
              <BuildingIcon :size="20" />
              <span v-if="!isCollapsed">Organization</span>
            </router-link>
            <router-link to="/audit" class="nav-item nav-audit">
              <ShieldIcon :size="20" />
              <span v-if="!isCollapsed">Audit Logs</span>
            </router-link>
          </template>

          <!-- Secretary Specific -->
          <template v-if="authStore.role === 'secretary'">
            <div v-if="!isCollapsed" class="nav-section-title">Secretariat Tools</div>
            <router-link to="/agenda" class="nav-item nav-agenda">
              <MicIcon :size="20" />
              <span v-if="!isCollapsed">Agenda & Minutes</span>
            </router-link>
            <router-link to="/doc-control" class="nav-item nav-doc-control">
              <ShieldIcon :size="20" />
              <span v-if="!isCollapsed">Document Control</span>
            </router-link>
            <router-link to="/reports" class="nav-item nav-reports">
              <BarChartIcon :size="20" />
              <span v-if="!isCollapsed">Reporting</span>
            </router-link>
          </template>

          <!-- Shared Board/Sec Links -->
          <div v-if="!isCollapsed" class="nav-section-title">Board Operations</div>
          <router-link to="/meetings" class="nav-item nav-meetings">
            <CalendarIcon :size="20" />
            <span v-if="!isCollapsed">Meetings</span>
          </router-link>
          
          <router-link v-if="authStore.role !== 'admin'" to="/strategy" class="nav-item nav-strategy">
            <TargetIcon :size="20" />
            <span v-if="!isCollapsed">Strategy</span>
          </router-link>

          <router-link to="/documents" class="nav-item nav-documents">
            <FilesIcon :size="20" />
            <span v-if="!isCollapsed">Documents</span>
          </router-link>

          <router-link to="/tasks" class="nav-item nav-tasks">
            <CheckSquareIcon :size="20" />
            <span v-if="!isCollapsed">Tasks</span>
          </router-link>
          
          <router-link v-if="authStore.role === 'member'" to="/voting" class="nav-item nav-voting">
            <VoteIcon :size="20" />
            <span v-if="!isCollapsed">Voting</span>
          </router-link>
        </nav>

        <div class="sidebar-footer mt-auto p-4 flex flex-col gap-2">
          <div class="nav-item" @click="isCollapsed = !isCollapsed">
            <ChevronLeftIcon v-if="!isCollapsed" :size="20" />
            <ChevronRightIcon v-else :size="20" />
            <span v-if="!isCollapsed">Collapse Menu</span>
          </div>
          <div class="nav-item text-danger" @click="handleLogout">
            <LogOutIcon :size="20" />
            <span v-if="!isCollapsed">Sign Out</span>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="main-container">
        <!-- Topbar -->
        <header class="topbar flex justify-between items-center px-8 py-4 bg-white border-b">
          <div class="search-box flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border">
            <SearchIcon :size="18" class="text-muted" />
            <input type="text" placeholder="Search strategy, meetings..." class="bg-transparent border-none outline-none text-sm w-72" />
          </div>

          <div class="flex items-center gap-6">
            <div class="notifications-bell relative cursor-pointer p-2 hover:bg-slate-50 rounded-lg transition-colors">
              <BellIcon :size="20" class="text-muted" />
              <span class="notification-badge"></span>
            </div>
            <div class="user-profile flex items-center gap-3 cursor-pointer p-1.5 px-3 hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-100">
              <div class="avatar">{{ authStore.user?.name.split(' ').map(n => n[0]).join('') }}</div>
              <div class="user-info">
                <div class="user-name text-sm font-semibold">{{ authStore.user?.name }}</div>
                <div class="user-role uppercase tracking-wider text-[9px] font-bold text-primary">{{ authStore.role }}</div>
              </div>
              <ChevronDownIcon :size="14" class="text-muted opacity-50" />
            </div>
          </div>
        </header>

        <!-- Page Content -->
        <div class="page-content p-10">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </main>
    </div>

    <!-- Global Components -->
    <ToastSystem ref="toastRef" />
  </div>
</template>

<script setup>
import { ref, provide, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { authStore } from './stores/auth'
import ToastSystem from './components/ToastSystem.vue'
import { 
  LayoutDashboard as LayoutDashboardIcon,
  Calendar as CalendarIcon,
  Target as TargetIcon,
  Files as FilesIcon,
  CheckSquare as CheckSquareIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Search as SearchIcon,
  Bell as BellIcon,
  ChevronDown as ChevronDownIcon,
  Users as UsersIcon,
  Building as BuildingIcon,
  Shield as ShieldIcon,
  LogOut as LogOutIcon,
  Mic as MicIcon,
  BarChart as BarChartIcon,
  Vote as VoteIcon
} from 'lucide-vue-next'

const router = useRouter()
const isCollapsed = ref(false)
const toastRef = ref(null)

const notify = (title, message, type) => {
  toastRef.value?.addToast(title, message, type)
}

const handleLogout = () => {
  authStore.logout()
  router.push('/welcome')
}

onMounted(() => {
  authStore.init()
})

provide('notify', notify)
</script>

<style>
/* Global resets and previous styles... */
.app-wrapper { height: 100vh; width: 100vw; overflow: hidden; }
.app-layout { display: flex; height: 100vh; overflow: hidden; }
.public-container { height: 100vh; overflow-y: auto; }

.sidebar { width: 260px; background-color: #f8fafc; color: #1e293b; display: flex; flex-direction: column; transition: width 0.3s; flex-shrink: 0; border-right: 1px solid var(--border); }
.sidebar.collapsed { width: 80px; }

.nav-section-title { font-size: 0.65rem; font-weight: 800; text-transform: uppercase; color: #94a3b8; padding: 1.5rem 1.5rem 0.5rem; letter-spacing: 0.05em; }

.logo-box { background-color: var(--primary); color: white; width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0; }
.logo-text { font-family: var(--font-heading); font-weight: 700; font-size: 1.25rem; color: var(--primary); }

.sidebar-nav { display: flex; flex-direction: column; gap: 0.25rem; padding: 0 0.75rem; }
.nav-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; border-radius: var(--radius-md); color: #64748b; cursor: pointer; transition: all 0.2s; text-decoration: none; }
.nav-item:hover { background-color: var(--background); color: var(--primary); }
.router-link-active { background-color: var(--primary-light); color: var(--primary); font-weight: 600; }

/* Role Highlights */
.nav-dashboard.router-link-active { color: var(--cyan); border-right: 3px solid var(--cyan); }
.nav-users.router-link-active { color: var(--indigo); border-right: 3px solid var(--indigo); }
.nav-org.router-link-active { color: var(--amber); border-right: 3px solid var(--amber); }

.main-container { flex: 1; display: flex; flex-direction: column; background-color: var(--background); overflow-y: auto; }
.topbar { position: sticky; top: 0; z-index: 10; }
.avatar { background-color: #dbeafe; color: #1e40af; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; }

/* Previous spacing fixes */
.modal-content { padding: 2rem !important; }
.form-group { margin-bottom: 1.5rem !important; }
</style>
