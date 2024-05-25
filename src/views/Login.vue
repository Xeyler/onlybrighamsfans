<template>
    <h1>Sign In</h1>>
    <input type="text" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <button @click="register">Submit</button>
    <button @click="signInWithGoogle">Sign In With Google</button>\
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "vue-router";
const email = ref("");
const password = ref("");
const router = useRouter();
const errorMessage = ref();

const register = () => {
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data) => {
            router.push("/")
        })
        .catch((error) => {
            switch (error.code) {
                case "auth/invalid-email":
                    errorMessage.value = "Invalid email";
                    break;
                case "auth/user-not-found":
                    errorMessage.value = "No account with that email was found";
                    break;
                case "auth/wrong-password":
                    errorMessage.value = "Incorrect password";
                    break;
                default:
                    errorMessage.value = "An error occurred. Please try signing in again";
                    break;
            }
        });
};

const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
        .then((result) => {
            console.log(result.user);
            router.push("/");
        })
        .catch((error) => {

        });
};
</script>