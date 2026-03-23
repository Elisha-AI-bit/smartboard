import { reactive } from 'vue'

export const authStore = reactive({
  user: null,
  isAuthenticated: false,
  role: 'public', // admin, member, secretary, public

  login(credentials) {
    // Mocking a Zambia-based user for MVP
    if (credentials.role === 'admin') {
      this.user = { name: 'Mutale Chanda', email: 'admin@smartboard.zm', role: 'admin' }
      this.role = 'admin'
    } else if (credentials.role === 'secretary') {
      this.user = { name: 'Mwila Phiri', email: 'sec@smartboard.zm', role: 'secretary' }
      this.role = 'secretary'
    } else {
      this.user = { name: 'Lombe Mulenga', email: 'member@smartboard.zm', role: 'member' }
      this.role = 'member'
    }
    this.isAuthenticated = true
    localStorage.setItem('sb_user', JSON.stringify(this.user))
  },

  logout() {
    this.user = null
    this.isAuthenticated = false
    this.role = 'public'
    localStorage.removeItem('sb_user')
  },

  init() {
    const saved = localStorage.getItem('sb_user')
    if (saved) {
      this.user = JSON.parse(saved)
      this.role = this.user.role
      this.isAuthenticated = true
    }
  }
})
