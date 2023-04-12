import { createRouter, createWebHistory } from 'vue-router';

import AboutPage from '@/components/Pages/AboutPage.vue';
import GalleryPage from '@/components/Pages/GalleryPage.vue';
import LoginPage from '@/components/Pages/LoginPage.vue';
import TutorialPage from '@/components/Pages/TutorialPage.vue';
import SingleTutorial from '@/components/Pages/SingleTutorial.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: TutorialPage },
        { path: '/history', component: GalleryPage },
        { path: '/login', component: LoginPage },
        { path: '/about', component: AboutPage },
        { path: '/tutorials/:id', component: SingleTutorial }
    ]
})

export default router;