<script setup>
import Modal from './Modal.vue';
import { ref, watch } from 'vue';
import axios from 'axios';
const props = defineProps({
    ticket_id: { type: BigInt },
    replies: { type: Array, default: [] },
    state: { type: String, default: 'open' },
    isModalOpen: { type: Boolean, default: false }
})
const emit = defineEmits(['close']);
const canReply = ref(false);

watch(() => props.state, (newState) => {
  canReply.value = newState === 'closed';
}, { immediate: true });
const newReply = ref('');

function reopen() {
    if (canReply.value) {
        try {
            axios.post(`/tickets/reopen/${props.ticket_id}`, {
                'comment': newReply.value
            })

        } catch (error) {
            alert("didn't work idiot");
            console.log(error);
        }
    }
    else {
        alert("cannot reply");
        emit('close');
    }
}

</script>

<template>

    <Modal :show="isModalOpen" @close="$emit('close')">

        <div class="flex flex-col space-y-4 p-4">

            <div class="flex flex-col space-y-2 max-h-80 overflow-y-auto">
                <div class="w-full flex min-w-[30vw]">
                    <div class="w-1/2 bg-gray-200 text-gray-800 text-center">Support</div>
                    <div class="w-1/2 bg-blue-500 text-white text-center">You</div>
                </div>
                <div v-for="(reply, index) in replies" :key="index" :class="[
                    'p-2 rounded-lg',
                    reply.user_id ? 'self-end bg-blue-500 text-white' : 'self-start bg-gray-200 text-gray-800'
                ]">
                    <p>{{ reply.comment }}</p>
                    
                </div>
                <div v-if="replies.length === 0" class=" text-gray-400">There is nothing...</div>
            </div>
            <!-- Reply input -->
            <div v-if="canReply" class="flex items-end gap-4 mt-4">
                <textarea v-model="newReply" type="text" placeholder="Write a comment to reopen the ticket"
                    class="flex-grow border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                <button @click="reopen" class="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600">
                    Reopen
                </button>
            </div>
        </div>

    </Modal>

</template>