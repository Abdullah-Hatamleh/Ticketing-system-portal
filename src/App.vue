<script setup>
import HelloWorld from './components/HelloWorld.vue'
import NavBar from './components/NavBar.vue';
import { ref } from 'vue';
import LoginModal from './components/LoginModal.vue';
import TicketDash from './components/TicketDash.vue';
import CreateTicket from './components/CreateTicket.vue';
import auth from './stores/auth';
const loginScreen = ref(!auth.isLoggedIn.value);
const ticketCreation = ref(false);

function closeLoginModal() {
  loginScreen.value = false;
}
function openLoginModal() {
  loginScreen.value = true;
}
// function createTicket() {
//   ticketCreation.value = true;
// }
// function stopTicketCreation() {
//   ticketCreation.value = false;
// }
</script>

<template>
  <NavBar @open-login="openLoginModal" />
  <div class="pt-4 max-w-screen overflow-x-clip">

    <LoginModal :isModalOpen="loginScreen" @close="closeLoginModal" />

    <TicketDash v-if="auth.isLoggedIn.value" @create-ticket="createTicket" />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
