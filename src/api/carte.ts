import { useAuthStore } from "@/store/auth"
import axios from "axios"
import type { Carte } from "../../types/Carte"


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

export async function fetchCarteByBarmaker() {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/cartes/barmaker`, {
    headers: getAuthHeaders(),
  })
  return res.data
}

export async function createCarte(carte: Carte) {
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/cartes`, carte, {
    headers: getAuthHeaders(),
  })
  return res.data
}