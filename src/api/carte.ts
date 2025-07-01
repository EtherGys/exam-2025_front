import axios from "axios"

export async function fetchAllCartes() {
  const res = await axios.get(`${import.meta.env.API_URL}/cartes`)
  return res.data
}

export async function fetchCarte(id: string) {
  const res = await axios.get(`${import.meta.env.API_URL}/cartes/${id}`)
  return res.data
}

export async function fetchCarteByBarmaker(id: string) {
  const res = await axios.get(`${import.meta.env.API_URL}/cartes/barmaker/${id}`)
  return res.data
}

export async function createCarte(carte: any) {
  const res = await axios.post(`${import.meta.env.API_URL}/cartes`, carte)
  return res.data
}