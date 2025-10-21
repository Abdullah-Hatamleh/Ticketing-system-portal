<script setup>
import axios from 'axios';
import Modal from './Modal.vue';
import { ref } from 'vue';

defineProps({
    isModalOpen: {
        type: Boolean
    }
})
const emit = defineEmits(['close', 'newTicket']);

const issue = ref('');
const priority = ref('');
const comment = ref('');
const categories = ref([]);
const attachment = ref(null);
const errors = ref([]);
const handleFileChange = (event) => {
    attachment.value = event.target.files[0];
}

const createTicket = async () => {

    const formData = new FormData();
    formData.append('issue', issue.value)
    formData.append('priority', priority.value)
    formData.append('comment', comment.value)
    categories.value.forEach((cat, i) => {
        formData.append(`categories[${i}]`, cat)
    })
    if (attachment.value) {
        formData.append('attachment', attachment.value)
    }
    try {
        const response = await axios.post('/tickets', formData, {
            headers: {
                "Accept": "application/json"
            }
        })
        if (response.status == 201) {
            console.log(201);
            errors.value = [];
            emit('close');
            emit('newTicket');
        }
    }
    catch (e) {
        if (e.status == 422) {
            errors.value = e.response.data.errors;
            console.log(e);
        }
        else {
            alert("an Issue occurred")
            console.error(e);
        }
    }
}

</script>

<template>
    <Modal :show="isModalOpen" @close="$emit('close')">
        <template #title>Create a new ticket</template>
        <template class="w-1/2" #default>
            <form action="" @submit.prevent="createTicket" class="flex flex-col">
                <div class="bg-[#D3E079] py-4 "><label for="issue">Issue :</label> <input required v-model="issue"
                        class="w-full inline-block" type="text" id="issue" placeholder="What is the issue?">
                    <div class=" text-red-600" v-for="error in errors['issue']"> {{ error }}</div>
                </div>
                <div class="bg-[#D3E079] py-4 border-t border-b "><label for="priority">Priority :</label>
                    <select required v-model="priority" name="Select Priority" id="priority">
                        <option value="low">low</option>
                        <option value="medium">medium</option>
                        <option value="high">high</option>
                        <option value="critical">critical</option>
                    </select>
                    <div class=" text-red-600" v-for="error in errors['priority']"> {{ error }}</div>
                </div>
                <div class="bg-[#D3E079] py-4 lg:w-[50rem] flex "><label for="comment">comment:</label>
                    <textarea v-model="comment" class="lg:w-[48rem] border px-2" name="comment" id="comment"></textarea>
                    <div class=" text-red-600" v-for="error in errors['comment']"> {{ error }}</div>
                </div>
                <div class="bg-[#D3E079] py-4 flex gap-3 border-t border-b "><label for="categories">Categories:</label>
                    <label for="cat1">cat1</label>
                    <input v-model="categories" type="checkbox" id="cat1" :value="'cat1'">
                    <label for="cat2">cat2</label>
                    <input v-model="categories" type="checkbox" id="cat2" :value="'cat2'">
                    <label for="cat3">cat3</label>
                    <input v-model="categories" type="checkbox" id="cat3" :value="'cat3'">
                    <div class=" text-red-600" v-for="error in errors['categories']"> {{ error }}</div>
                </div>
                <div class="bg-[#D3E079] py-4 lg:w-[50rem] flex flex-col "><label for="attachment">Attachment:</label>
                    <input type="file" @change="handleFileChange" name="attachment" id="attachment" class="block w-full text-sm text-gray-700
         file:mr-4 file:py-2 file:px-4
         file:rounded file:border-0
         file:text-sm file:font-semibold
         file:bg-[#65C792] file:text-white
         hover:file:bg-[#50aa78] file:cursor-pointer">
                    <div class=" text-red-600" v-for="error in errors['attachment']"> {{ error }}</div>
                </div>
                <input type="submit" value="Create"
                    class=" cursor-pointer bg-[#65C792] text-white py-4 px-8 w-fit self-center m-4 rounded-full">
            </form>
        </template>
    </Modal>
</template>
