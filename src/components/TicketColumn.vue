<script setup>
import { onMounted, ref, onUnmounted, watch, nextTick } from 'vue'


const props = defineProps({
    title: String,
    state: String,
    tickets: Array,
    loading: Boolean,
    gradient: String
})

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
const emit = defineEmits(['loadMore'])

const columnRef = ref(null)

const checkScrollNeedsMore = () => {
  const el = columnRef.value;
  if (el && el.scrollHeight <= el.clientHeight && !props.loading) {
    emit('loadMore', props.state);
  }
};

const handleScroll = () => {
    const el = columnRef.value
    if (el && el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
        emit('loadMore', props.state)
    }
}

onMounted(() => {
    columnRef.value?.addEventListener('scroll', handleScroll)

    checkScrollNeedsMore();
})
// onUnmounted(() => {
//   columnRef.value?.removeEventListener('scroll', handleScroll)
// })
</script>
<template>
  <div :class="['h-full lg:w-1/5 md:w-1/3 rounded-t-[90px] relative flex flex-col', gradient]">
    <!-- State Label -->
    <span class="absolute -top-2 left-1/2 transform -translate-x-1/2 font-semibold text-sm z-10">
      {{ title }}
    </span>

    <!-- Scrollable content area, fills remaining height -->
    <div
      ref="columnRef"
      class="mt-12 px-4 flex-1 overflow-y-auto flex flex-col gap-4"
    >
      <!-- Ticket Cards -->
      <div
        v-for="ticket in tickets"
        :key="ticket.id"
        class="bg-white/60 backdrop-blur-md rounded px-2 py-8 shadow text-sm w-full relative"
      >
        <div
          :class="[
            'absolute top-0 left-0 p-2 text-white text-xs font-bold rounded-br',
            ticket.priority === 'critical' ? 'bg-red-500' :
            ticket.priority === 'high' ? 'bg-yellow-500' :
            ticket.priority === 'medium' ? 'bg-green-500' :
            'bg-gray-500'
          ]"
        >
          {{ ticket.priority }}
        </div>
        <div class="text-center">
          {{ ticket.title }}
        </div>
      </div>

      <!-- Loading indicator -->
      <div v-if="loading" class="text-center text-xs text-gray-600 py-2">
        Loading more...
      </div>
    </div>
  </div>
</template>


<style scoped>
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: transparent; /* lets column background show */
  margin-block: 4px; /* vertical spacing inside container */
}

::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.25); /* adjust for your theme */
  border-radius: 6px;
  border: 2px solid transparent;
  background-clip: content-box;
}
</style>