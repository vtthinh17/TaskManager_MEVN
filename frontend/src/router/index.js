import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/:id/tasks",
        name: "user.task",
        component: () => import("@/views/UserTask.vue"),
    },
    {
        path: "/:id/tasks/add",
        name: "task.add",
        component: () => import("@/views/AddTask.vue"),
        props: true 
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
        },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;