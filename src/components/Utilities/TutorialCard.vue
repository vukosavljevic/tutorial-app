<template>
    <div class="video--wrapper">
        <!-- <button class="" @click="$emit('delete-event', id)">X</button> -->
        <router-link :to="'/tutorials/' + this.id">
            <iframe width="560" height="315" :src="video" title="YouTube video player" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen></iframe>
            <div class="video--wrapper-content">
                <div class="video--topic">JavaScript</div>
                <h1>{{ title }} </h1>
                <p class="video--desc">{{ sliceDescription }}..</p>
                <p class="video--autor">{{ author }}</p>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    props: ['title', 'description', 'id', 'video', 'author'],
    computed: {
        sliceDescription() {
            return this.description.slice(0, 200);
        }
    }
}
</script>

<style scoped>
.video--wrapper {
    width: 31.25rem;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 10px 15px 7px rgba(0,0,0,0.1);
}
.video--wrapper-content{
    padding:2rem 0 2rem 1rem;
}
.video--desc{
    opacity: 0.5;
    font-size: 0.8rem;
    width: 80%;
}
.video--autor{
    opacity: 0.5;
    text-align: right;
    margin-right: 3rem;
}
.video--wrapper-content h1{
    margin-top: 1rem;
}

.video--topic {
    border: 1px solid red;
    color: red;
    display: inline;
    padding: 0.5rem
}

div {
    width: 100%;
    position: relative;
}

h1 {
    letter-spacing: -0.1rem;
}

button {
    position: absolute;
    right: 20%;
    top: 100px;
}

iframe {
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}</style>