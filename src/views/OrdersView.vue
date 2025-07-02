<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'
import { fetchCommandeByClient } from '../api/commandes'
import type { Commande } from '../../types/Commande'

const router = useRouter()
const auth = useAuthStore()
const loading = ref(true)
const error = ref('')
const commandes = ref<Commande[]>([])

onMounted(async () => {
  loading.value = true
  try {

    const data = await fetchCommandeByClient()
  console.log(data);
  
    commandes.value = data
    
  } catch (e: any) {
    error.value = e.message || 'Erreur lors du chargement des commandes.'
    console.log("catch");
  } finally {
    loading.value = false
    console.log("finally");
  }
})

function goToOrder(id: string | undefined) {
  if (id != undefined) {
    router.push(`/commandes/${id}`)
  }
}

function formatDate(dateStr?: string) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleString()
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-10">
    <h1 class="text-4xl font-bold mb-2">Mes commandes</h1>
    <p class="text-gray-500 mb-8">Retrouvez ici l'historique de toutes vos commandes passées.</p>

    <div v-if="loading" class="text-gray-400">Chargement...{{ loading }}</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else>
      <div v-if="commandes.length === 0" class="text-gray-500">Aucune commande passée.</div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="(commande, idx) in commandes" :key="idx" class="bg-white rounded-xl shadow-sm overflow-hidden transition hover:shadow-md cursor-pointer" @click="goToOrder(commande.id)">
          <div class="p-4">
            <div class="flex items-center justify-between mb-2">
              <div class="font-semibold text-lg">Commande du {{ formatDate(commande.dateHeureCommande || commande.dateCreation) }}</div>
              <span class="text-xs px-2 py-1 rounded bg-gray-100 border font-medium">{{ commande.statutCommande }}</span>
            </div>
           <!-- <div class="text-gray-500 text-sm mb-2">{{ commande.lignesDeCommande.length }} cocktail(s)</div>
            <ul class="text-sm text-gray-700">
              <li v-for="(ligne, i) in commande.lignesDeCommande" :key="i">
                <span class="font-medium">x{{ ligne.quantite }}</span>
                — {{ ligne.cocktailId }} ({{ ligne.taille }})
                <span v-if="ligne.statutCocktail" class="ml-2 text-xs text-gray-400">[{{ ligne.statutCocktail }}]</span>
              </li>
            </ul> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 