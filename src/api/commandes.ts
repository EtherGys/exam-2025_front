import axios from 'axios'


export async function createCommande(commande: any) {
  const res = await axios.post(`${import.meta.env.API_URL}/commandes`, commande)
  return res.data
}

export async function fetchCommandeStatus(id: number) {
  const res = await axios.get(`${import.meta.env.API_URL}/commandes/${id}`)
  return res.data
} 


export async function fetchCommande(id: string) {
  const res = await axios.get(`${import.meta.env.API_URL}/commandes/${id}`)
  return res.data
}

export async function fetchCommandeByBarmaker(id: string) {
  const res = await axios.get(`${import.meta.env.API_URL}/commandes/barmaker/${id}`)
  return res.data
}

export async function fetchCommandeByClient(id: string) {
  const res = await axios.get(`${import.meta.env.API_URL}/commandes/client/${id}`)
  return res.data
}