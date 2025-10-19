<script setup>
import Modal from './Modal.vue';
defineProps({
    isModalOpen: {
        type: Boolean
    }
})
defineEmits(['closeModal']);
</script>

<template>
    <Modal :show="isModalOpen" @close="$emit('closeModal')">
        <template #title>Create a new ticket</template>
        <template class="w-1/2" #default>
            <form action="">
                <div class="bg-[#D3E079] py-4 w-full "><label for="issue">Issue :</label> <input type="text" id="issue"
                        placeholder="What is the issue?"></div>
                <div class="bg-[#D3E079] py-4 w-full border-t border-b "><label for="priority">Priority :</label>
                    <select name="Select Priority" id="priority">
                        <option value="low">low</option>
                        <option value="medium">medium</option>
                        <option value="high">high</option>
                        <option value="critical">critical</option>
                    </select></div>
                <div class="bg-[#D3E079] py-4 lg:w-[50rem] flex "><label for="description">description:</label>
                    <textarea class="lg:w-[48rem] border px-2" name="description" id="description"></textarea></div>
                <div class="bg-[#D3E079] py-4 w-full flex gap-3 border-t border-b "><label for="categories">Categories:</label> <label
                        for="cat1">cat1</label> <input type="checkbox" id="cat1" name="cat1"><label
                        for="cat1">cat1</label> <input type="checkbox" id="cat1" name="cat1"><label
                        for="cat1">cat1</label> <input type="checkbox" id="cat1" name="cat1"> </div>
            </form>
        </template>
    </Modal>
</template>