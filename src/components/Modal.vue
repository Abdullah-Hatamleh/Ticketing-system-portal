<script setup>

import { watch } from 'vue';

const props = defineProps({
  show: Boolean,
  isForm: {
    type: Boolean,
    default: true,
  }
})
defineEmits(['close']);

watch(() => props.show, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden';
  }
  else {
    document.body.style.overflow = '';
  }
})
</script>
<!-- Modal.vue -->
<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-[#00000098] ">
    <!-- Modal content -->
    <div class="bg-white rounded-lg shadow-lg w-fit mx-4 relative overflow-auto max-h-[80vh]">
      <!-- Close button -->
      <button @click="$emit('close')" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl">
        &times;
      </button>

      <!-- Title -->
      <div v-if="$slots.title"
        :class="['px-6 pt-6 pb-2 text-lg font-semibold border-b text-center', isForm ? 'bg-[#D3E079]' : 'bg-[#65C792]']">
        <slot name="title" />
      </div>

      <!-- Body -->
      <div class="py-4">
        <slot />
      </div>

      <!-- Footer -->
      <div v-if="$slots.footer" class="px-6 py-3 flex justify-end">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
