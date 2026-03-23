<template>
  <div class="user-mgmt">
    <header class="flex justify-between items-center mb-8">
      <div>
        <h1>User Management</h1>
        <p class="text-muted">Manage system access and roles for board members and executives.</p>
      </div>
      <button class="btn btn-primary" @click="notify('Action Restricted', 'New users must be added via organization SSO or IT portal.', 'warning')">
        <UserPlusIcon :size="18" class="mr-2" /> Add User
      </button>
    </header>

    <div class="card overflow-hidden">
      <table class="w-full">
        <thead class="bg-slate-50 border-b">
          <tr>
            <th class="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase">User</th>
            <th class="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase">Role</th>
            <th class="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase">Status</th>
            <th class="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase">Last Login</th>
            <th class="text-right py-4 px-6 text-xs font-bold text-slate-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="border-b hover:bg-slate-50">
            <td class="py-4 px-6">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-primary">{{ user.name[0] }}</div>
                <div>
                  <div class="font-bold text-slate-900">{{ user.name }}</div>
                  <div class="text-xs text-muted">{{ user.email }}</div>
                </div>
              </div>
            </td>
            <td class="py-4 px-6">
              <span class="badge" :class="`badge-${user.roleColor}`">{{ user.role }}</span>
            </td>
            <td class="py-4 px-6">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-success"></span>
                <span class="text-sm">Active</span>
              </div>
            </td>
            <td class="py-4 px-6 text-sm text-slate-600">{{ user.lastLogin }}</td>
            <td class="py-4 px-6 text-right">
              <button class="text-slate-400 hover:text-primary p-2">
                <EditIcon :size="18" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { UserPlus as UserPlusIcon, Edit as EditIcon } from 'lucide-vue-next'

const notify = inject('notify')

const users = ref([
  { id: 1, name: 'Mutale Chanda', email: 'm.chanda@smartboard.zm', role: 'System Admin', roleColor: 'rose', lastLogin: '10 mins ago' },
  { id: 2, name: 'Mwila Phiri', email: 'm.phiri@smartboard.zm', role: 'Company Sec', roleColor: 'amber', lastLogin: '2 hours ago' },
  { id: 3, name: 'Lombe Mulenga', email: 'l.mulenga@smartboard.zm', role: 'Board Member', roleColor: 'indigo', lastLogin: 'Yesterday' },
  { id: 4, name: 'Mutinta Haimbe', email: 'm.haimbe@smartboard.zm', role: 'Board Member', roleColor: 'indigo', lastLogin: '3 days ago' }
])
</script>
