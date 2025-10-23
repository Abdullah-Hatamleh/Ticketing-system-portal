<script setup>
import Modal from './Modal.vue';
import { ref } from 'vue';
const props = defineProps({
    id: { type: BigInt },
    issue: { type: String, default: '' },
    priority: { type: String, default: '' },
    comment: { type: String, default: '' },
    state: { type: String, default: '' },
    categories: { type: JSON, default: {} },
    attachment: { type: String, default: '' },
    replies: { type: Array, default: [] }
})

const emit = defineEmits(['replies'])
// const id = ref(props.id);
// const issue = ref(props.issue)
// // const priority = ref(pro)

// const attachmentUrl = `http://${attachment}`;
// console.log("attach", attachment);
function openThread() {
    // console.log(props.replies);
    emit('replies', { replies: props.replies, id: props.id, state: props.state })
    emit('close');
}

const canViewThread = ref(false)

if ((props.replies && props.replies.length > 0) || props.state === "closed") {
    canViewThread.value = true;
}
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
                <div v-if="comment"><strong>comment:</strong> {{ comment }}</div>
                <div v-if="categories && categories.length"><strong>Categories:</strong> {{ JSON.stringify(categories)
                    }}
                </div>
                <div v-if="attachment"><strong>Attachment:</strong>
                    <a :href="attachment" target="_blank">
                        <img :src="attachment" alt="" class=" max-w-7xl">
                    </a>
                </div>
                <div v-if="canViewThread" class="w-full flex justify-center">
                    <button @click="openThread"
                        class=" font-extrabold rounded-lg hover:bg-[#65C792] w-fit p-2 cursor-pointer border hover:border-0 box-border">Reopn
                        /
                        thread</button>
                </div>
            </div>
        </template>
    </Modal>
</template>