import { createRouter, createWebHistory } from 'vue-router';

import CoachesPage from '@/components/Pages/CoachesPage.vue';
import GalleryPage from '@/components/Pages/GalleryPage.vue';
import TutorialPage from '@/components/Pages/TutorialPage.vue';
import SingleTutorial from '@/components/Pages/SingleTutorial.vue';
import ProfilePage from '@/components/Pages/ProfilePage.vue';
import ProfileAdmin from '@/components/Pages/ProfileAdmin.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: TutorialPage },
        { path: '/history', component: GalleryPage },
        { path: '/coaches', component: CoachesPage },
        { path: '/tutorials/:id', component: SingleTutorial },
        { path: '/myprofile', component: ProfileAdmin },
        { path: '/profile/:username', component: ProfilePage }
    ]
})

export default router;