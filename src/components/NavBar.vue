<script setup>
import auth from '../stores/auth';
defineEmits(['openLogin'])


</script>
<template>
    <Nav class="flex justify-between w-screen items-center pr-6 pt-4 border-b-2 border-[#BCCF31] drop-shadow-[#BCCF31]"
        style="box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.38);">
        <img src="../assets/logo.png" alt="">
        <h1 class=" lg:text-2xl text-sm ">Extensya Costumer Ticketing Portal</h1>
        <button class=" cursor-pointer p-3 bg-amber-100 rounded self-end mb-6" @click="$emit('openLogin')"
            v-if="!auth.isLoggedIn.value">Sign In</button>
        <button class=" cursor-pointer p-3 bg-amber-100 rounded self-end mb-6" @click="auth.logout" v-else>Sign
            out</button>
    </Nav>
</template>