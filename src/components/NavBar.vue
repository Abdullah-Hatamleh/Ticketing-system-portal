<script setup>
defineEmits(['openLogin'])
</script>
<template>
    <Nav class="flex justify-between w-screen items-center pr-6 border-b-2 border-[#BCCF31] drop-shadow-[#BCCF31]" style="box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.38);">
        <img src="../assets/logo.png" alt="">
        <h1>Extensya Costumer Ticketing Portal</h1>
        <button @click="$emit('openLogin')">Sign In</button>
    </Nav>
</template>