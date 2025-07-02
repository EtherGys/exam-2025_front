<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchCommandeStatus } from '../api/commandes'

const route = useRoute()
const commande = ref<any>(null)
const loading = ref(true)
const orderId = ref('')

// Simule la structure des étapes (à adapter selon les vraies données de l'API)
const steps = ref([
  { key: 'ordered', label: 'Ordered', time: '' },
  { key: 'preparing', label: 'Preparing', time: '' },
  { key: 'ready', label: 'Ready', time: '' },
])

onMounted(async () => {
  try {
    orderId.value = route.params.id as string
    const id = Number(orderId.value)
    if (!id) return
    const data = await fetchCommandeStatus(id)
    commande.value = data
    // Exemple de mapping (à adapter selon la structure réelle)
    // Ici, on suppose que data.statusHistory est un tableau d'étapes avec { key, label, time }
    if (data.statusHistory) {
      steps.value = data.statusHistory
    } else if (data.timeline) {
      steps.value = data.timeline
    } else {
      // fallback : simule les heures si non présentes
      steps.value = [
        { key: 'ordered', label: 'Ordered', time: data.dateHeureCommande ? new Date(data.dateHeureCommande).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '10:00 AM' },
        { key: 'preparing', label: 'Preparing', time: data.datePreparation ? new Date(data.datePreparation).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '10:05 AM' },
        { key: 'ready', label: 'Ready', time: data.datePret ? new Date(data.datePret).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '10:15 AM' },
      ]
    }
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="max-w-3xl mx-auto px-6 py-10">
    <h1 class="text-2xl font-bold mb-8">Order #{{ orderId }}</h1>
    <div v-if="loading" class="text-gray-400">Loading...</div>
    <div v-else>
      <ol class="relative border-l-2 border-gray-200 ml-4">
        <li v-for="(step, idx) in steps" :key="step.key" class="mb-8 ml-6 flex items-start">
          <span class="absolute -left-4 flex items-center justify-center w-7 h-7 rounded-full border-2"
            :class="[
              idx === 0 || idx === steps.length - 1 ? 'border-green-600 bg-white' : 'border-gray-400 bg-white',
              idx === 0 || idx === steps.length - 1 ? 'text-green-600' : 'text-gray-400'
            ]">
            <template v-if="idx === 0 || idx === steps.length - 1">
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
            <span class="text-sm text-gray-400 mt-1">{{ step.time }}</span>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>