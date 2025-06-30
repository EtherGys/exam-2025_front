<script setup lang="ts">
import router from '@/router';
import axios from 'axios';
import { ref } from 'vue';

interface User {
    email: string
    password: string
}

const model = ref<User>({
    email: '',
    password: ''
})

const login = async () => {
    try {
        
        const {data} = await axios.post('http://localhost:8080/user/login', model.value)
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
        <input type="password" aria-label="Password" v-model="model.password">
        <button @click="login()" >Connexion</button>
    </div>
</template>