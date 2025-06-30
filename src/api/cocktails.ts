import axios from 'axios'

const API_URL = 'http://localhost:8080/api'; // À adapter selon config back

export async function fetchCarte() {
  const res = await axios.get(`${API_URL}/carte`)
  return res.data
}

export async function fetchCocktail(id: number) {
  const res = await axios.get(`${API_URL}/cocktails/${id}`)
  return res.data
} 