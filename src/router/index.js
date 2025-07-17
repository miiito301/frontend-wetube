
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import ReviewList from '../components/Reviewlist.vue' 

const routes = [
    { path: '/', component: Home },
    { path: '/reviews', component: ReviewList }
]

export default createRouter({
    history: createWebHistory(),
    routes,
})