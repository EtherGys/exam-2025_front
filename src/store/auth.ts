import { defineStore } from 'pinia'
import { login as apiLogin, register as apiRegister, fetchMe } from '../api/auth'

export interface User {
  id: number
  nom: string
  email: string
  role: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem('token') || '',
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
        this.user = res.user
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
        this.user = res.user
      } catch (e: any) {
        this.error = e.response?.data?.message || 'Erreur d\'inscription'
      } finally {
        this.loading = false
      }
    },
    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
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