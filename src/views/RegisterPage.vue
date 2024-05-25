<template>
    <h1>Create an Account</h1>>
    <input type="text" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <button @click="register">Submit</button>
    <button @click="signInWithGoogle">Sign In With Google</button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
const email = ref("");
const password = ref("");
const router = useRouter();

const register = () => {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then(() => {
            router.push("/")
        })
        .catch((error) => {
            console.log(error.code);
            alert(error.message);
        });
};

const signInWithGoogle = () => {

};
</script>