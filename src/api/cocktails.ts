import axios from 'axios'

export async function fetchCocktail(id: number) {
  const res = await axios.get(`${import.meta.env.API_URL}/cocktails/${id}`)
  return res.data
} 

export async function fetchAllCocktails() {
  const res = await axios.get(`${import.meta.env.API_URL}/cocktails`)
  return res.data
}

export async function createCocktail(cocktail: any) {
  const res = await axios.post(`${import.meta.env.API_URL}/cocktails`, cocktail)
  return res.data
}