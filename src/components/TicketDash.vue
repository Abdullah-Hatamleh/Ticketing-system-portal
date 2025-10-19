<script setup>
import { ref, onMounted } from 'vue'
import TicketColumn from './TicketColumn.vue'

// Ticket state values (matching your UI labels)
const states = {
  closed: 'Closed',
  open: 'Open',
  awaiting: 'Awaiting'
}

defineEmits(['createTicket']);

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
const fetchTicketsByState = async (state) => {
    console.log("fetching new tickets")
  if (isLoading.value[state]) return
  isLoading.value[state] = true

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800))

  // Mock data
  const newTickets = Array.from({ length: 5 }).map((_, i) => ({
    id: `${state}-${page.value[state]}-${i}`,
    title: `Ticket ${state.toUpperCase()} ${page.value[state]}-${i}`,
    state,
    priority: getRandomPriority() 
  }))

  tickets.value[state].push(...newTickets)
  page.value[state]++
  isLoading.value[state] = false
}

// Load initial batch
onMounted(() => {
  Object.keys(states).forEach(state => {
    fetchTicketsByState(state)
  })
})
</script>

<template class="max-w-screen">
  <!-- Top bar -->
  <div class="flex justify-between px-4 pt-4">
    <div></div>
    <h2 class="font-bold text-lg">Tickets status</h2>
    <button class="font-bold rounded-lg bg-[#65C792] w-fit p-2" @click="$emit('createTicket')">New Ticket</button>
  </div>

  <!-- Columns -->
  <div class="h-[80vh] lg:px-6 px-1.5 pt-12 flex justify-between max-w-screen overflow-clip gap-4">
    <TicketColumn
      state="closed"
      title="Closed"
      gradient="bg-gradient-1"
      :tickets="tickets.closed"
      :loading="isLoading.closed"
      @loadMore="fetchTicketsByState"
    />
    <TicketColumn
      state="open"
      title="Open"
      gradient="bg-gradient-2"
      :tickets="tickets.open"
      :loading="isLoading.open"
      @loadMore="fetchTicketsByState"
    />
    <TicketColumn
      state="awaiting"
      title="Awaiting"
      gradient="bg-gradient-3"
      :tickets="tickets.awaiting"
      :loading="isLoading.awaiting"
      @loadMore="fetchTicketsByState"
    />
  </div>
</template>

<style scoped>
/* Optional custom scroll styling */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(100, 100, 100, 0.2);
  border-radius: 3px;
}
</style>

