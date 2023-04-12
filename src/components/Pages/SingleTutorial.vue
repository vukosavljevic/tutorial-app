<template>
    <div>
        <h1>Hey its your its post with id hehe {{ id }}</h1>
        <h1>{{ title }}</h1>
        <p> {{ description }}</p>
        <iframe width="560" height="315" :src="video" title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen></iframe>
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
            video: ''
        }
    },
    created() {
        this.id = this.$route.params.id
        axios.get('http://localhost:8080/tutorials/' + this.id )
            .then(res => {
                const data = res.data[0];
                this.title = data.title;
                this.description = data.description;
                this.video = data.video;
                console.log(data)
            })
            .catch(err =>{
                console.log (err)
            })
    }
}
</script>