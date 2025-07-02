import { useAuthStore } from '@/store/auth'
import axios from 'axios'

function getAuthHeaders() {
  const auth = useAuthStore()
  return auth.token ? { Authorization: `Bearer ${auth.token}` } : {}
}


export async function createCommande(commande: any) {
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/commandes`, commande, {
    headers: getAuthHeaders(),
  })
  return res.data
}

export async function fetchCommandeStatus(id: number) {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/commandes/${id}`, {
    headers: getAuthHeaders(),
  })
  return res.data
} 


export async function fetchCommande(id: string) {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/commandes/${id}`, {
    headers: getAuthHeaders(),
  })
  return res.data
}

export async function fetchCommandeByBarmaker(id: string) {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/commandes/barmaker/${id}`, {
    headers: getAuthHeaders(),
  })
  return res.data
}

export async function fetchCommandeByClient(id: string) {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/commandes/client/${id}`, {
    headers: getAuthHeaders(),
  })
  return res.data
}