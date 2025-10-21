import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import axios from "axios";
import auth from "./stores/auth";

axios.defaults.baseURL = "http://127.0.0.1:8000/api";
auth.checkAuth();
createApp(App).mount("#app");
