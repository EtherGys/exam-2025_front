<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const auth = useAuthStore()
const router = useRouter()

async function onLogin() {
  await auth.login(email.value, password.value)
  if (auth.token) {
    router.push('/')
  }
}

watch(() => auth.token, (token) => {
  if (token) router.push('/')
})
</script> 

<template>
  <div class="max-w-md mx-auto mt-12 bg-white p-8 rounded shadow">
    <h1 class="text-2xl font-bold mb-6">Connexion</h1>
    <form @submit.prevent="onLogin">
      <div class="mb-4">
        <label class="block mb-1">Email</label>
        <input v-model="email" type="email" class="w-full border rounded px-3 py-2" required />
      </div>
      <div class="mb-4">
        <label class="block mb-1">Mot de passe</label>
        <input v-model="password" type="password" class="w-full border rounded px-3 py-2" required />
      </div>
      <div v-if="auth.error" class="text-red-500 mb-2">{{ auth.error }}</div>
      <button type="submit" class="w-full bg-pink-200 text-gray-800 font-semibold py-3 rounded-full text-lg hover:bg-pink-300 transition" :disabled="auth.loading">Se connecter</button>
    </form>
    <div class="mt-4 text-sm text-center">
      Pas de compte ? <router-link to="/register" class="text-pink-400 hover:underline">Créer un compte</router-link>
    </div>
  </div>
</template>