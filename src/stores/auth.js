import axios from "axios";
import { ref } from "vue";

const isLoggedIn = ref(false);
const userName = ref(null);

async function checkAuth() {
  const token = localStorage.getItem("auth_token");
  isLoggedIn.value = !!token; //converting the string to true if it's not a falsy value (null)

  if (isLoggedIn.value) {
    //Setting the token to be used in all future axios requests
    axios.interceptors.request.use((config) => {
      config.headers.Authorization = `bearer ${token}`;
      return config;
    });
    const response = await axios.get("/user");
    userName.value = response.data.name;
     
  }
}

function logout() {
  localStorage.removeItem("auth_token");
  isLoggedIn.value = false;
  console.log(isLoggedIn.value);
}

export default {
  isLoggedIn,
  checkAuth,
  logout,
  userName
};
