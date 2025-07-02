<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { Carte } from '../../types/Carte';
import { fetchCommandeByBarmaker, updateLigneStatut } from '@/api/commandes';
import { StatutCommande, type Commande, StatutCocktail } from '../../types/Commande';


const router = useRouter();
const commandes = ref<any[]>([]);
const loading = ref(true);
const error = ref('');
const showPopup = ref(false);
const selectedCommande = ref<any | null>(null);
const selectedStatut = ref<string>('');

onMounted(async () => {
  loading.value = true;
  try {
    const data: Commande[] = await fetchCommandeByBarmaker();
    commandes.value = data.filter(c => c.statutCommande != StatutCommande.TERMINEE);
  } catch (e) {
    error.value = 'Erreur lors du chargement des commandes.';
  } finally {
    loading.value = false;
  }
});

function goToOrder(id: string | undefined) {
  if (id != undefined) {
    router.push(`/commandes/${id}`)
  }
}

function openStatutPopup(commande: any) {
  selectedCommande.value = commande;
  selectedStatut.value = commande.statutCocktail;
  showPopup.value = true;
}

function closePopup() {
  showPopup.value = false;
  selectedCommande.value = null;
}

async function saveStatut() {
  if (selectedCommande.value) {
    try {
      await updateLigneStatut(selectedCommande.value.id, selectedStatut.value);
      selectedCommande.value.statutCocktail = selectedStatut.value;
    } catch (e) {
      error.value = 'Erreur lors de la mise à jour du statut.';
    }
  }
  closePopup();
}
</script>

<template>
  <div class="md:w-[80%] md:m-auto min-h-screen bg-white flex flex-col">
         <header class="flex items-center justify-between px-4 py-3 border-b">
      <button @click="$router.back()" aria-label="Retour" class="text-gray-500 text-2xl cursor-pointer">←</button>
      <h1 class="text-lg font-semibold">Retour</h1>
      <div style="width: 2rem"></div>
    </header>
    <main class="flex-1 px-4 py-6">
      <h2 class="text-2xl font-bold mb-6">Vos préparations en cours</h2>
      <div v-if="loading" class="text-gray-400">Chargement...</div>
      <div v-else-if="error" class="text-red-500">{{ error }}</div>
     <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="(commande, idx) in commandes" :key="idx" class="bg-white rounded-xl shadow-sm overflow-hidden transition hover:shadow-md cursor-pointer" @click="goToOrder(commande.id)">
          <div class="p-4">
            <div class="flex flex-col md:flex-row items-center justify-between mb-2">
              <div class="font-semibold text-lg">Préparation du cocktail {{ commande.nomCocktail }}</div>
              <span class="text-xs px-2 py-1 rounded bg-gray-100 border font-medium cursor-pointer" @click.stop="openStatutPopup(commande)">{{ commande.statutCocktail }}</span>
              <span class="">Taille : {{ commande.taille }}</span>
              <span class="">Quantité : {{ commande.quantite }}</span>
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
  </main>
  <div v-if="showPopup" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0  bg-opacity-25 backdrop-blur-sm"></div>
    <div class="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-xs">
      <h3 class="text-lg font-semibold mb-4">Modifier le statut du cocktail</h3>
      <div class="flex flex-col gap-2 mb-4">
        <label v-for="statut in Object.values(StatutCocktail)" :key="statut" class="flex items-center gap-2 cursor-pointer">
          <input type="radio" :value="statut" v-model="selectedStatut" />
          <span>{{ statut }}</span>
        </label>
      </div>
      <div class="flex justify-end gap-2">
        <button @click="closePopup" class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">Annuler</button>
        <button @click="saveStatut" class="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">Enregistrer</button>
      </div>
    </div>
  </div>
</div>
</template>
