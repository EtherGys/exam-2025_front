import { defineStore } from 'pinia'

export interface CartItem {
  id: number
  nom: string
  taille: string
  prix: number
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),
  getters: {
    total: (state) => state.items.reduce((sum, item) => sum + item.prix * item.quantity, 0),
  },
  actions: {
    addItem(newItem: CartItem) {
      const existing = this.items.find(
        item => item.id === newItem.id && item.taille === newItem.taille
      )
      if (existing) {
        existing.quantity += newItem.quantity
      } else {
        this.items.push({ ...newItem })
      }
    },
    removeItem(id: number, taille: string) {
      this.items = this.items.filter(item => !(item.id === id && item.taille === taille))
    },
    updateQuantity(id: number, taille: string, quantity: number) {
      const item = this.items.find(item => item.id === id && item.taille === taille)
      if (item && quantity > 0) {
        item.quantity = quantity
      }
    },
    resetCart() {
      this.items = []
    },
  },
}) 