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

export async function fetchCommandeByBarmaker() {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/commandes/barmaker`, {
    headers: getAuthHeaders(),
  })
  return res.data
}

export async function fetchCommandeByClient() {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/commandes/client`, {
    headers: getAuthHeaders(),
  })
  return res.data
}

export async function updateLigneStatut(ligneId: number, statut: string) {
  const res = await axios.put(
    `${import.meta.env.VITE_API_URL}/commandes/lignes/${ligneId}/statut`,
    { statut },
    { headers: getAuthHeaders() }
  );
  return res.data;
}