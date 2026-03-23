import { createRouter, createWebHistory } from 'vue-router'
import { authStore } from '../stores/auth'

// Public Views
import LandingView from '../views/public/LandingView.vue'
import LoginView from '../views/auth/LoginView.vue'
import RegisterView from '../views/auth/RegisterView.vue'

// Authenticated Views
import DashboardView from '../views/DashboardView.vue'
import MeetingsView from '../views/MeetingsView.vue'
import StrategyView from '../views/StrategyView.vue'
import DocumentsView from '../views/DocumentsView.vue'
import TasksView from '../views/TasksView.vue'

import VotingView from '../views/VotingView.vue'
import ReportingView from '../views/secretary/ReportingView.vue'
import DocViewerView from '../views/DocViewerView.vue'

// Admin Views
import UserManagementView from '../views/admin/UserManagementView.vue'
import OrgManagementView from '../views/admin/OrgManagementView.vue'
import AuditLogsView from '../views/admin/AuditLogsView.vue'

// Secretary Views
import AgendaEditorView from '../views/secretary/AgendaEditorView.vue'
import DocumentControlView from '../views/secretary/DocumentControlView.vue'

const routes = [
  { path: '/welcome', component: LandingView, name: 'landing' },
  { path: '/login', component: LoginView, name: 'login' },
  { path: '/register', component: RegisterView, name: 'register' },
  { path: '/', component: DashboardView, meta: { requiresAuth: true } },
  { path: '/users', component: UserManagementView, meta: { requiresAuth: true } },
  { path: '/organization', component: OrgManagementView, meta: { requiresAuth: true } },
  { path: '/audit', component: AuditLogsView, meta: { requiresAuth: true } },
  { path: '/agenda', component: AgendaEditorView, meta: { requiresAuth: true } },
  { path: '/doc-control', component: DocumentControlView, meta: { requiresAuth: true } },
  { path: '/voting', component: VotingView, meta: { requiresAuth: true } },
  { path: '/reports', component: ReportingView, meta: { requiresAuth: true } },
  { path: '/viewer', component: DocViewerView, meta: { requiresAuth: true } },
  { path: '/meetings', component: MeetingsView, meta: { requiresAuth: true } },
  { path: '/strategy', component: StrategyView, meta: { requiresAuth: true } },
  { path: '/documents', component: DocumentsView, meta: { requiresAuth: true } },
  { path: '/tasks', component: TasksView, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  authStore.init()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/welcome')
  } else if ((to.name === 'login' || to.name === 'landing' || to.name === 'register') && authStore.isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
