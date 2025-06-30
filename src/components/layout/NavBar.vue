<script setup lang="ts">
import { RouterLink } from 'vue-router';


</script>

<template>
    <div class="">
     <nav>
       <RouterLink to="/">Home</RouterLink>
       <RouterLink to="/cocktails">Cocktails</RouterLink>
       <RouterLink to="/login">Login</RouterLink>
       <RouterLink to="/register">Register</RouterLink>
     </nav>
   </div>
</template>