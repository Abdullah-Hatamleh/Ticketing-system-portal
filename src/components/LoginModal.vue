<script setup>
import { ref } from 'vue';
import Modal from './Modal.vue';
defineProps({
    isModalOpen : {
        type : Boolean,
        default : true
    },
})
const emit = defineEmits(['close'])
</script>
<template>
    <Modal :show="isModalOpen" @close="$emit('close')" >
       <template #title> Sign In To View And Create Tickets</template> 
       <template #default> <form class="pt-6 flex flex-col gap-y-6 justify-center items-center" action="post">
        <div class="bg-[#D3E079] py-4 w-full "><label for="Email">Email :</label> <input type="text" id="Email" placeholder="Enter Email Here"></div>

        <div class="bg-[#D3E079] py-4 w-full "><label for="pass">Password :</label> <input type="password" id="pass" placeholder="Enter Password Here"></div>

        <button class=" font-bold rounded-lg hover:bg-[#65C792] w-fit p-2">Sign in</button>
       </form>
       </template>
    </Modal>
</template>