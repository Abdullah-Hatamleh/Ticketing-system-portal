<script setup>
import { ref, onMounted } from 'vue'
import TicketColumn from './TicketColumn.vue'
import ViewTicket from './ViewTicket.vue'
import auth from '../stores/auth'
import axios from 'axios'
import CreateTicket from './CreateTicket.vue'
import Replythread from './replythread.vue'

// Ticket state values (matching your UI labels)
const states = {
  closed: 'Closed',
  open: 'Open',
  awaiting: 'Awaiting'
}

const emit = defineEmits(['createTicket']);
const ticketCreation = ref(false);  
const threadModalOpen = ref(false)
// Reactive data stores per group
const tickets = ref({
  closed: [],
  open: [],
  awaiting: []
})


const page = ref({
  closed: 1,
  open: 1,
  awaiting: 1
})

const selectedTicket = ref(null)
const viewModalOpen = ref(false)

function openView(ticket) {
  selectedTicket.value = ticket
  viewModalOpen.value = true
}

function closeView() {
  viewModalOpen.value = false
  selectedTicket.value = null
}

function createTicket() {
  ticketCreation.value = true;
}
function stopTicketCreation() {
  ticketCreation.value = false;
}

const isLoading = ref({
  closed: false,
  open: false,
  awaiting: false
})


const getRandomPriority = () => {
  const priorities = ['low', 'medium', 'high', 'critical'];
  return priorities[Math.floor(Math.random() * priorities.length)];
};
// Fetch mock tickets per group (simulate API)
// const fetchTicketsByState = async (state) => {
//   console.log("fetching new tickets")
//   if (isLoading.value[state]) return
//   isLoading.value[state] = true

//   // Simulate network delay
//   await new Promise(resolve => setTimeout(resolve, 800))

//   // Mock data
//   const newTickets = Array.from({ length: 5 }).map((_, i) => ({
//     id: `${state}-${page.value[state]}-${i}`,
//     title: `Ticket ${state.toUpperCase()} ${page.value[state]}-${i}`,
//     state,
//     priority: getRandomPriority()
//   }))

//   tickets.value[state].push(...newTickets)
//   page.value[state]++
//   isLoading.value[state] = false
// }

const fetchTicketsByState = async (state) => {
  // console.log("????");
  const currentPage = page.value[state];
  const uri = `/tickets/bystate/${state}?page=${currentPage}`
  const response = await axios.get(uri)
  const newtickets = response.data.data;
  console.log(newtickets);
  
  tickets.value[state].push(...newtickets);
  page.value[state]++;

  // console.log(response.data);
}

// Load initial batch
onMounted(() => {
  Object.keys(states).forEach(state => {
    fetchTicketsByState(state)
  })
})

function refreshOpentickets() {
tickets.value['open'] = [];
page.value['open'] = 1;

fetchTicketsByState('open');
}

const threadReplies = ref([]);
const threadId = ref();
const threadState = ref();
function openReplies(payload) {
  threadReplies.value = payload.replies;
  threadId.value = payload.id
  threadState.value = payload.state;

  threadModalOpen.value = true;
}
function closeThreadModal() {
  threadModalOpen.value = false;
}
</script>

<template class="max-w-screen">
  <!-- Top bar -->
  <div class="flex justify-between px-4 pt-4">
    <div></div>
    <h2 class="font-bold text-lg">Welcome {{ auth.userName.value}}!</h2>
    <button class="font-bold rounded-lg bg-[#65C792] w-fit p-2 cursor-pointer" @click="createTicket">New Ticket</button>
  </div>

  <!-- Columns -->
  <div class="lg:h-[80vh] lg:px-6 px-1.5 pt-12 flex-col lg:flex-row flex justify-between max-w-screen overflow-clip gap-16">
    <TicketColumn state="closed" title="Closed" gradient="bg-gradient-1" :tickets="tickets.closed"
      :loading="isLoading.closed" @loadMore="fetchTicketsByState" @selectTicket="openView" />
    <TicketColumn state="open" title="Open" gradient="bg-gradient-2" :tickets="tickets.open" :loading="isLoading.open"
      @loadMore="fetchTicketsByState" @selectTicket="openView" />
    <TicketColumn state="awaiting" title="Awaiting" gradient="bg-gradient-3" :tickets="tickets.awaiting"
      :loading="isLoading.awaiting" @loadMore="fetchTicketsByState" @selectTicket="openView" />
  </div>
  <ViewTicket v-if="viewModalOpen" v-bind="selectedTicket" @close="closeView" :isForm="false" @replies="openReplies" />
  <Replythread :isModalOpen="threadModalOpen" :replies="threadReplies" :ticket_id="threadId" :state="threadState" @close="closeThreadModal"/>
  <CreateTicket :isModalOpen="ticketCreation" @close="stopTicketCreation" @newTicket="refreshOpentickets" />

</template>

<style scoped>

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(100, 100, 100, 0.2);
  border-radius: 3px;
}
</style>
