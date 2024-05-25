<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/paywall">Paywall</router-link>
    <router-link to="/register">Register</router-link>
    <router-link to="/login">Login</router-link>
    <button @click="signout" v-if="isLoggedIn">Sign out</button>
  </nav>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted, ref, defineComponent } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import router from "./router";

const isLoggedIn = ref(false);

const auth = getAuth();

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = Boolean(user);
  })
})

const signout = () => {
  signOut(auth).then(() => {
    router.push("/login");
  });
};
</script>