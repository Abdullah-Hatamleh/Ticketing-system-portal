import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import axios from "axios";
import auth from "./stores/auth";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  HiDocumentAdd,
  HiRefresh,
  RiCloseCircleFill,
} from "oh-vue-icons/icons";

// axios.get('http://localhost:8000/api/user')
//   .then(res => console.log(res))
//   .catch(err => console.error(err));
addIcons(HiDocumentAdd, HiRefresh, RiCloseCircleFill);

const app = createApp(App);
app.component("v-icon", OhVueIcon);
axios.defaults.baseURL = "/api";
auth.checkAuth();
app.mount("#app");
