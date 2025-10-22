<script setup>
import { onMounted, ref, onUnmounted, watch, nextTick } from 'vue'



const props = defineProps({
  title: String,
  state: String,
  tickets: Array,
  loading: Boolean,
  gradient: String
})

console.log("TICKETS :", props.tickets);
watch(
  () => {
    try {
      return props.tickets?.length ?? 0
    } catch (e) {
      console.error('Error in ticket length watcher:', e)
      return 0
    }
  },
  async () => {
    try {
      await nextTick()
      checkScrollNeedsMore()
    } catch (e) {
      console.error('Error in checkScrollNeedsMore:', e)
    }
  }
)
const emit = defineEmits(['loadMore', 'selectTicket'])

const columnRef = ref(null)

const checkScrollNeedsMore = () => {
  const el = columnRef.value;
  if (el && el.scrollHeight <= el.clientHeight && !props.loading) {
    emit('loadMore', props.state);
  }
};

const loadmore = () => {
  emit('loadMore', props.state)
}

onMounted(() => {
  // columnRef.value?.addEventListener('scroll', handleScroll)

  // checkScrollNeedsMore();
})
// onUnmounted(() => {
//   columnRef.value?.removeEventListener('scroll', handleScroll)
// })
</script>
<template>
  <div :class="['h-full lg:w-1/3 w-10/12 relative flex flex-col drop', gradient]" :id="title">
    <!-- State Label -->
    <span class="absolute -top-2 left-1/2 transform -translate-x-1/2 font-bold text-lg z-10">
      {{ title }}
    </span>

    <!-- Scrollable content area, fills remaining height -->
    <div ref="columnRef" class="mt-12 px-8 flex-1 overflow-y-auto flex flex-col gap-8">
      <!-- Ticket Cards -->
      <div v-for="ticket in tickets" :key="ticket.id"
        class="bg-white/60 backdrop-blur-md rounded px-2 py-8 shadow text-sm w-full relative cursor-pointer transition-transform duration-200 ease-in-out hover:scale-[1.02] hover:shadow-lg"
        @click="emit('selectTicket', ticket)">
        <div :class="[
          'absolute top-0 left-0 p-2 text-xs font-bold rounded-br-3xl',
          ticket.priority === 'critical' ? 'bg-[#dc3545] text-white' :
            ticket.priority === 'high' ? 'bg-[#fd7e14] text-black' :
              ticket.priority === 'medium' ? 'bg-[#28a745] text-black' :
                'bg-[#6c757d] text-white'
        ]">
          {{ ticket.priority }}
        </div>
        <div class="text-center">
          {{ ticket.issue }}
        </div>
      </div>

      <!-- Loading indicator now load more button -->
      <button @click="loadmore"
        class="text-center text-white bg-blue-500 p-2 w-fit self-center mb-4 cursor-pointer rounded">
        Load more
      </button>
    </div>
  </div>
</template>


<style scoped>
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: transparent;
  /* lets column background show */
  margin-block: 4px;
  /* vertical spacing inside container */
}

::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.25);
  /* adjust for your theme */
  border-radius: 6px;
  border: 2px solid transparent;
  background-clip: content-box;
}
</style>