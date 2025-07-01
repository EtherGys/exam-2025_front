import axios from 'axios'

export async function login(email: string, password: string) {
  const res = await axios.post(`${import.meta.env.API_URL}/auth/login`, { email, password })
  return res.data
}

export async function register(nom: string, email: string, password: string) {
  const res = await axios.post(`${import.meta.env.API_URL}/auth/register`, { nom, email, password })
  return res.data
}

export async function fetchMe(token: string) {
  const res = await axios.get(`${import.meta.env.API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
} 