import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCmOnrPAL-i7MLGv2Z2JdYg-o-DwpGcR-8",
  authDomain: "onlybrighamsfans.firebaseapp.com",
  projectId: "onlybrighamsfans",
  storageBucket: "onlybrighamsfans.appspot.com",
  messagingSenderId: "887131600837",
  appId: "1:887131600837:web:9550e0f1531f5c457dfdac"
};

initializeApp(firebaseConfig);

const app = createApp(App)

app.use(router)

app.mount('#app')
