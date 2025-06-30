<script setup lang="ts">
import router from '@/router';
import axios from 'axios';
import { ref } from 'vue';

interface User {
    nom: string
    email: string
    password: string
}

const model = ref<User>({
    nom: '',
    email: '',
    password: ''
})

const register = async () => {
    try {
        
        const {data} = await axios.post('http://localhost:8080/user/create', model.value)
        if (!data) {
            
            router.push("/")
        }
    } catch (error) {
        console.log(error);
        
    }
}

</script>

<template>
    <div class="">
        <input type="text" aria-label="Email" v-model="model.email">
        <input type="text" aria-label="Nom" v-model="model.nom">
        <input type="password" aria-label="Password" v-model="model.password">
        <button @click="register()" >Inscription</button>
    </div>
</template>