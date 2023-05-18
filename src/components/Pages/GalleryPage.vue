<template>
    <main>
        <div class="gallery--navigation">
            <search-bar @search-data="searchData"></search-bar>
        </div>
        <div class="tutorial--wrapper" v-if="!searchedState">
            <tutorial-card v-for="tutorial in allVideos" :id="tutorial.id" :key="tutorial.id" :title="tutorial.title"
                :description="tutorial.description" :video="tutorial.video" :author="tutorial.author"
                @delete-event="deleteNow"></tutorial-card>
        </div>
        <div class="tutorial--wrapper" v-if="searchedState">
            <tutorial-card v-for="tutorial in foundVideos" :id="tutorial.id" :key="tutorial.id" :title="tutorial.title"
                :description="tutorial.description" :video="tutorial.video" :author="tutorial.author"
                @delete-event="deleteNow"></tutorial-card>
            <div v-if="foundVideos.length === 0">
                <p>There is no search for {{ this.searchUnit }}</p>
            </div>
        </div>
    </main>
</template>

<script>
import SearchBar from '../Utilities/SearchBar.vue';
import axios from 'axios';
import TutorialCard from '../Utilities/TutorialCard.vue';
export default {
    components: {
        TutorialCard,
        SearchBar
    },
    data() {
        return {
            allVideos: [],
            foundVideos : [],
            searchUnit : '',
            searchedState : false
        }
    },
    methods: {
        findTitle(tutorial){
            const lowerTitle = tutorial.title.toLowerCase()
            const lowerSearch = this.searchUnit.toLowerCase();
            return lowerTitle.includes(lowerSearch)
        },
        searchData(searchData) {
            this.searchUnit = searchData
            this.foundVideos = this.allVideos.filter(this.findTitle);
            const proxyArray = this.foundVideos[0];
            console.log(this.foundVideos);
            console.log(proxyArray);
            this.searchedState = true;
        }
    },
    mounted() {
        axios.get('http://localhost:8080/tutorials')
            .then(res => {
                const data = res.data;
                this.allVideos = data;
            })
    }
}
</script>

<style scoped>
main {
    display: flex;
    flex-direction: column;
}

.gallery--navigation {
    margin-bottom: 2rem;
}

.tutorial--wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4rem !important;
    padding: 0 8vw;
}
</style>