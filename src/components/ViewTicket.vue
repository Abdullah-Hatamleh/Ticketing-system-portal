<script setup>
import { ref } from "vue";
import { Modal } from "./Modal.vue";
defineProps({
    title: String,
    priority: String,
    description: String,
    state: String,
    categories: Array,
    attachment: File
})
defineEmits({
    
})
const isModalVisible = ref(false)
</script>

<template>
    <Modal :show="isModalVisible" @close="$emit">
        <template #title></template>
        <template #default> test</template>
    </Modal>
</template>