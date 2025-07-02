import { defineStore } from 'pinia'
import { login as apiLogin, register as apiRegister, fetchMe } from '../api/auth'
import type { User } from '../../types/User'


export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: localStorage.getItem('role') || null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: '',
  }),
  actions: {
    async login(email: string, password: string) {
      this.loading = true
      this.error = ''
      try {
        const res = await apiLogin(email, password)
        this.token = res.token
        localStorage.setItem('token', res.token)
        this.user = res.client.role
        console.log(res);
        localStorage.setItem('role', res.client.role)
        
      } catch (e: any) {
        this.error = e.response?.data?.message || 'Erreur de connexion'
      } finally {
        this.loading = false
      }
    },
    async register(nom: string, email: string, password: string) {
      this.loading = true
      this.error = ''
      try {
        const res = await apiRegister(nom, email, password)
        this.token = res.token
        localStorage.setItem('token', res.token)
        this.user = res.client
      } catch (e: any) {
        this.error = e.response?.data?.message || 'Erreur d\'inscription'
      } finally {
        this.loading = false
      }
    },
    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('role')
    },
    async fetchMe() {
      if (!this.token) return
      try {
        const user = await fetchMe(this.token)
        this.user = user
      } catch {
        this.logout()
      }
    }
  },
}) 