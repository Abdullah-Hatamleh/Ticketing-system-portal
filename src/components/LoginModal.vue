<script setup>
import { ref } from 'vue';
import Modal from './Modal.vue';
import axios from 'axios';
import auth from '../stores/auth';
defineProps({
    isModalOpen : {
        type : Boolean,
        default : true
    },
})

const email = ref('');
const password = ref('');


const emit = defineEmits(['close'])

const login = async () => {
    try {
        const response = await axios.post('/login', {
            email: email.value,
            password: password.value
        });

        const token = response.data.token;
        
        localStorage.setItem('auth_token', token);

        auth.checkAuth();
        
        emit('close')

    }
    catch (e) {
    console.error(e);
    }
}
</script>
<template>
    <Modal :show="isModalOpen" @close="$emit('close')" >
       <template #title> Sign In To View And Create Tickets</template> 
       <template #default> <form class="pt-6 flex flex-col gap-y-6 justify-center items-center" action="post" @submit.prevent="login">
        <div class="bg-[#D3E079] py-4 w-full "><label for="Email">Email :</label> <input type="text" id="Email" v-model="email" placeholder="Enter Email Here"></div>

        <div class="bg-[#D3E079] py-4 w-full "><label for="pass">Password :</label> <input type="password" id="pass" v-model="password" placeholder="Enter Password Here"></div>

        <button class=" font-bold rounded-lg hover:bg-[#65C792] w-fit p-2">Sign in</button>
       </form>
       </template>
    </Modal>
</template>