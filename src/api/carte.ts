import { useAuthStore } from "@/store/auth"
import axios from "axios"


function getAuthHeaders() {
  const auth = useAuthStore()
  return auth.token ? { Authorization: `Bearer ${auth.token}` } : {}
}

export async function fetchAllCartes() {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/cartes`)
  return res.data
}

export async function fetchCarte(id: string) {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/cartes/${id}`, {
    headers: getAuthHeaders(),
  })
  return res.data
}

export async function fetchCarteByBarmaker(id: string) {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/cartes/barmaker/${id}`)
  return res.data
}

export async function createCarte(carte: any) {
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/cartes`, carte)
  return res.data
}