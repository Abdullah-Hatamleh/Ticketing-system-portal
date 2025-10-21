<script setup>
import Modal from './Modal.vue';
const props = defineProps({
    id: { type: String, default: '' },
    issue: { type: String, default: '' },
    priority: { type: String, default: '' },
    description: { type: String, default: '' },
    state: { type: String, default: '' },
    categories: { type: JSON, default: {} },
    attachment: { type: String, default: '' }
})

// const attachmentUrl = `http://${attachment}`;
// console.log("attach", attachment);

</script>

<template>
    <Modal :show="true" @close="$emit('close')">
        <template #title>
            Ticket Details
        </template>
        <template #default>
            <div class="p-4 space-y-2">
                <div><strong>ID:</strong> {{ id }}</div>
                <div><strong>Issue:</strong> {{ issue }}</div>
                <div><strong>State:</strong> {{ state }}</div>
                <div><strong>Priority:</strong> {{ priority }}</div>
                <div v-if="description"><strong>Description:</strong> {{ description }}</div>
                <div v-if="categories && categories.length"><strong>Categories:</strong> {{ JSON.stringify(categories) }}
                </div>
                <div v-if="attachment"><strong>Attachment:</strong>
                    <img :src="attachment" alt="" class=" max-w-7xl">
                </div>
            </div>
        </template>
    </Modal>
</template>