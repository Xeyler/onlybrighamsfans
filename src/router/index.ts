import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Paywall from "../views/Paywall.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { 
            path: "/",
            component: () => Home,
            meta: {
                requiresAuth: true
            }
        },
        { path: "/register", component: () => Register },
        { path: "/login", component: () => Login },
        { 
            path: "/paywall",
            component: () => Paywall,
            meta: {
                requiresAuth: true
            }
        }
    ]
});

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            }
        )
    });
};

router.beforeEach(async (to, from, next) => {
    if(!to.matched.some((record) => record.meta.requiresAuth)) {
        next();
        return;
    }
    if (await getCurrentUser()) {
        next();
        return;
    }
    next("/login");
});

export default router;