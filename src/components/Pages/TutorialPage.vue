<template>
    <div>
        <tutorial-card v-for="tutorial in tutorials" :id="tutorial.id" :key="tutorial.id" :title="tutorial.title"
            :description="tutorial.description" :video="tutorial.video" @delete-event="deleteNow"></tutorial-card>
    </div>
</template>

<script>
import TutorialCard from '../Utilities/TutorialCard.vue';
import axios from 'axios';
export default {
    components: {
        TutorialCard
    },
    data() {
        return {
            tutorials: []
        }
    },
    methods: {
        deleteNow(id) {
            console.log(id)
            axios.delete('http://localhost:8080/tutorials/' + id)
                .then( () => {
                    axios.get('http://localhost:8080/tutorials/')
                        .then(res => {
                            const data = res.data;
                            this.tutorials = data;
                            console.log(data);
                            if (this.tutorials.length > 4) {
                                this.tutorials = this.tutorials.slice(0, 4)
                            }
                        })
                })
        }
    },
    mounted() {
        axios.get('http://localhost:8080/tutorials/')
            .then(res => {
                const data = res.data;
                this.tutorials = data;
                console.log(data);
                if (this.tutorials.length > 4) {
                    this.tutorials = this.tutorials.slice(0, 4)
                }
            })
            .catch(error => {
                console.log(error);
            })
        console.log(this.tutorials)
    }
}
</script>

<style scoped>
div{
    display: grid;
    grid-template-columns: repeat(2,1fr);
}
</style>