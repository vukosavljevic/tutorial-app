<template>
    <div class="main--gallery-wrapper">
        <the-main></the-main>
        <div class="tutorial--wrapper">
            <tutorial-card v-for="tutorial in tutorials" :id="tutorial.id" :key="tutorial.id" :title="tutorial.title"
                :description="tutorial.description" :video="tutorial.video" :author="tutorial.author"
                @delete-event="deleteNow"></tutorial-card>
        </div>
        <h1><span>About</span></h1>
        <p>This was a school project meant to be nothing but it happend to be something, it is free for use and if you want
            to make some changes all code is on github and you can try yourself out.The stack for this was basic Node.js
            with Express and MySQL database for backend, for frontend was used Vue.js and Jest for tests. Anyways have fun
            and keep coding! </p><br>
        <div class="code--checkout">
            <span>You can see code here</span>
            <a href="https://github.com/vukosavljevic">
                <img src="@/assets/25231.png" alt="Github icon">
            </a>
        </div>
    </div>
</template>

<script>
import TheMain from '../UI/TheMain.vue';
import TutorialCard from '../Utilities/TutorialCard.vue';
import axios from 'axios';

export default {
    components: {
        TutorialCard,
        TheMain
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
                .then(() => {
                    axios.get('http://localhost:8080/tutorials/')
                        .then(res => {
                            const data = res.data;
                            this.tutorials = data;
                            console.log(data);
                            this.tutorials = this.tutorials.slice(0, 3)
                        })
                })
        }
    },
    mounted() {
        axios.get('http://localhost:8080/tutorials/')
            .then(res => {
                const data = res.data;
                this.tutorials = data;
                console.log(this.tutorials);
                this.tutorials = this.tutorials.slice(this.tutorials.length - 3, this.tutorials.length)
            })
            .catch(error => {
                console.log(error);
            })
        console.log(this.tutorials)
    }
}
</script>

<style scoped>
h1 {
    color: black;
    margin: 5rem;
}

button {
    margin-top: 2rem;
    margin-left: 12rem;
}

p,
li {
    color: black;
    font-size: 1.3rem;
    max-width: 80%;
    margin: auto;
}

a>img {
    width: 22px;
    height: 22px;
}
.code--checkout{
    display: flex;
    align-items: center;
    gap:0.5rem;
    margin-left: 12rem;
}
</style>
