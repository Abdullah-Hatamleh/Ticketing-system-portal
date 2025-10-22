import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import axios from "axios";
import auth from "./stores/auth";

// axios.get('http://localhost:8000/api/user')
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

axios.defaults.baseURL = "/api";
auth.checkAuth();
createApp(App).mount("#app");
