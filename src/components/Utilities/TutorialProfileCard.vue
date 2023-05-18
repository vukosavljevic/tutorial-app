<template>
    <div class="video--wrapper">
        <router-link :to="'/tutorials/' + this.id">
            <div class="video--wrapper-content">
                <h1>{{ title }} </h1>   
            </div>
            <iframe width="100" height="100" :src="video" title="YouTube video player" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen></iframe>
        </router-link>
    </div>
</template>

<script>
export default {
    props: ['title', 'id', 'video']
}
</script>

<style scoped>
.video--wrapper {
    display: flex;
    justify-content: space-between;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 10px 15px 7px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
}

.video--wrapper-content {
    padding: 0 !important;
    display: flex;
    justify-content: center;
    align-items: center;
}

.video--desc {
    opacity: 0.5;
    font-size: 0.8rem;
    width: 80%;
}

.video--autor {
    opacity: 0.5;
    text-align: right;
    margin-right: 3rem;
}

.video--wrapper-content h1 {
    margin-top: 0rem;
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
    font-size: 1rem;
}

button {
    position: absolute;
    right: 20%;
    top: 100px;
}

iframe {
    width: 50%;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}
a{
    display: flex;
    margin:0;
    width: 100%;
}
</style>