<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchCommandeStatus } from '../api/commandes'
import { StatutCommande } from '../../types/Commande'

const route = useRoute()
const router = useRouter()
const commande = ref<any>(null)
const loading = ref(true)
const orderId = ref('')

// Simule la structure des étapes (à adapter selon les vraies données de l'API)
const steps = ref( [
        { key: StatutCommande.COMMANDEE, label: 'Commandé'},
        { key: StatutCommande.EN_PREPARATION, label: 'En cours de préparation'},
        { key: StatutCommande.TERMINEE, label: 'Terminée'},
      ])

onMounted(async () => {
  try {
    orderId.value = route.params.id as string
    const id = Number(orderId.value)
    if (!id) return
    const data = await fetchCommandeStatus(id)
    commande.value = data
    
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="max-w-3xl mx-auto px-6 py-10">
    <header class="flex items-center justify-between px-4 py-3 border-b">
      <button @click="router.push({ name: 'Commandes'})" aria-label="Retour" class="text-gray-500 text-2xl cursor-pointer">←</button>
      <h1 class="text-lg font-semibold">Retour aux commandes</h1>
      <div style="width: 2rem"></div>
    </header>
    <h1 class="text-2xl font-bold mb-8 mt-6">Commande #{{ orderId }}</h1>
    <div v-if="loading" class="text-gray-400">Chargement...</div>
    <div v-else>
      <ol class="relative border-l-2 border-gray-200 ml-4">
        <li v-for="(step, idx) in steps" :key="step.key" class="mb-8 ml-6 flex items-start">
          <span class="absolute -left-4 flex items-center justify-center w-7 h-7 rounded-full border-2"
            :class="[
              step.key <= commande.statutCommande ? 'border-green-600 bg-white' : 'border-gray-400 bg-white',
              step.key <= commande.statutCommande ? 'text-green-600' : 'text-gray-400'
            ]">
            <template v-if="step.key <= commande.statutCommande">
              <!-- Check icon -->
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
            </template>
            <template v-else>
              <!-- Circle icon -->
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
            </template>
          </span>
          <div class="flex flex-col">
            <span class="font-semibold text-base">{{ step.label }}</span>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>