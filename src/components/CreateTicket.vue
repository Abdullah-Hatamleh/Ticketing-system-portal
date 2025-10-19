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
            <form action="" class="flex flex-col">
                <div class="bg-[#D3E079] py-4 "><label for="issue">Issue :</label> <input class="w-full inline-block"
                        type="text" id="issue" placeholder="What is the issue?"></div>
                <div class="bg-[#D3E079] py-4 border-t border-b "><label for="priority">Priority :</label>
                    <select name="Select Priority" id="priority">
                        <option value="low">low</option>
                        <option value="medium">medium</option>
                        <option value="high">high</option>
                        <option value="critical">critical</option>
                    </select>
                </div>
                <div class="bg-[#D3E079] py-4 lg:w-[50rem] flex "><label for="description">description:</label>
                    <textarea class="lg:w-[48rem] border px-2" name="description" id="description"></textarea>
                </div>
                <div class="bg-[#D3E079] py-4 flex gap-3 border-t border-b "><label for="categories">Categories:</label>
                    <label for="cat1">cat1</label> <input type="checkbox" id="cat1" name="cat1"><label
                        for="cat1">cat1</label> <input type="checkbox" id="cat1" name="cat1"><label
                        for="cat1">cat1</label> <input type="checkbox" id="cat1" name="cat1"> </div>
                <div class="bg-[#D3E079] py-4 lg:w-[50rem] flex flex-col "><label for="attachment">Attachment:</label>
                    <input type="file" name="attachment" id="attachment" class="block w-full text-sm text-gray-700
         file:mr-4 file:py-2 file:px-4
         file:rounded file:border-0
         file:text-sm file:font-semibold
         file:bg-[#65C792] file:text-white
         hover:file:bg-[#50aa78] file:cursor-pointer"></div>
         <input type="submit" value="Create" class=" cursor-pointer bg-[#65C792] text-white py-4 px-8 w-fit self-center m-4 rounded-full">
            </form>
        </template>
    </Modal>
</template>