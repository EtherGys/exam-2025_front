<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';


interface User {
    nom: string
    email: string
}
const datas = ref<User[]>([])

const getUsers = async () => {
    try {
        
        const {data} = await  axios.get('http://localhost:8080/user/users')
        datas.value = data;
        console.log(data);
        
    } catch (error) {
        console.log(error);
        
    }
}


onMounted(() => {
 getUsers()
})
</script>

<template>
    <div>
        <h1>Liste d'utilisateurs</h1>
        <table>
            <thead>
                <th>
                    Nom
                </th>
                <th>
                    Prenom
                </th>
            </thead>
            <tbody v-for="user in datas">
                <td>
                    {{  user.nom }}
                </td>
                <td>
                    {{ user.email }}
                </td>
            </tbody>
        </table>
    </div>
    
</template>
