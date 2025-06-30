<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchCommandeStatus } from '../api/commandes'

const route = useRoute()
const commande = ref<any>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const id = Number(route.params.id)
    if (!id) return
    const data = await fetchCommandeStatus(id)
    commande.value = data
  } finally {
    loading.value = false
  }
})
</script> 

<template>
  <div>
    <h1 class="text-2xl font-bold mb-2">Suivi de votre commande</h1>
    <div v-if="loading" class="text-gray-400">Chargement...</div>
    <div v-else-if="commande">
      <div class="mb-4">Statut de la commande : <span class="font-semibold">{{ commande.statut }}</span></div>
      <div>
        <h2 class="font-semibold mb-2">Cocktails :</h2>
        <ul>
          <li v-for="c in commande.cocktails" :key="c.id">
            {{ c.nom }} ({{ c.taille }}) — <span class="text-sm">{{ c.statut }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div v-else class="text-red-500">Commande introuvable.</div>
  </div>
</template>