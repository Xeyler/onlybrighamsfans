import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { 
            path: "/",
            component: () => import("../views/Home.vue"),
            meta: {
                requiresAuth: true
            }
        },
        { path: "/register", component: () => import("../views/Register.vue") },
        { path: "/login", component: () => import("../views/Login.vue") },
        { 
            path: "/paywall",
            component: () => import("../views/Paywall.vue"),
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