import axios from 'axios'

const API_URL = 'http://localhost:8080/api'; // À adapter si besoin

export async function createCommande(payload: any) {
  const res = await axios.post(`${API_URL}/commandes`, payload)
  return res.data
}

export async function fetchCommandeStatus(id: number) {
  const res = await axios.get(`${API_URL}/commandes/${id}`)
  return res.data
} 