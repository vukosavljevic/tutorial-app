<template>
    <div>
        <button class="" @click="$emit('delete-event', id)">X</button>
        <router-link :to="'/tutorials/' + this.id">
            <h1>{{ title }}</h1>
            <p> {{ description }}</p>
            <iframe width="560" height="315" :src="video" title="YouTube video player" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen></iframe>
        </router-link>
    </div>
</template>

<script>
export default {
    props: ['title', 'description', 'id', 'video']
}
</script>

<style scoped>
div{
    width: 560px;
    position: relative;
    padding:4rem;
}
button{
    position: absolute;
    right:20%;
}
</style>