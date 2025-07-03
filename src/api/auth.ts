import axios from 'axios'

export async function login(email: string, password: string) {
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/clients/login`, { email, password })
  return res.data
}

export async function register(nom: string, email: string, password: string) {
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/clients`, { nom, email, password })
  return res.data
}