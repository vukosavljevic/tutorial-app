<template>
    <div>
        <h1>{{ title }}</h1>
        <h4>{{ author }}</h4>
        <iframe width="560" height="315" :src="video" title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen></iframe>
        <p> {{ description }}</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            id: null,
            title: '',
            description: '',
            video: '',
            author: ''
        }
    },
    created() {
        this.id = this.$route.params.id
        axios.get('http://localhost:8080/tutorials/' + this.id)
            .then(res => {
                const data = res.data[0];
                this.title = data.title;
                this.description = data.description;
                this.video = data.video;
                this.author = data.author
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
    }
}
</script>

<style scoped>
h1 {
    color: black !important;
}
h4{
    margin-bottom: 3rem;
}

div {
    padding:2rem 10rem;
}

iframe {
    width: 100%;
    height: 800px;
}

p {
    margin-top: 3rem;
    font-size: 1.5rem;

}
</style>