import axios from 'axios'
import { useAuthStore } from '../store/auth'
import type { Cocktail } from '../../types/Cocktail'


function getAuthHeaders() {
  const auth = useAuthStore()
  return auth.token ? { Authorization: `Bearer ${auth.token}` } : {}
}

export async function fetchCocktail(id: number) {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/cocktails/${id}`, {
    headers: getAuthHeaders(),
  })
  return res.data
} 

export async function fetchAllCocktails() {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/cocktails`, {
    headers: getAuthHeaders(),
  })
  return res.data
}

export async function createCocktail(cocktail: any) {
  console.log(cocktail);
  
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/cocktails`, cocktail, {
    headers: getAuthHeaders(),
  })
  return res.data
}

export async function deleteCocktail(id: number) {
  const res = await axios.delete(`${import.meta.env.VITE_API_URL}/cocktails/${id}`, {
    headers: getAuthHeaders(),
  })
  return res.data
}

export async function updateCocktail(id: number, cocktail: any) {
  const res = await axios.put(`${import.meta.env.VITE_API_URL}/cocktails/${id}`, cocktail, {
    headers: getAuthHeaders(),
  })
  return res.data
}