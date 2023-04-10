<template>
    <header>
        <ul>
            <router-link to="/">Homepage</router-link>
            <router-link to="/history">All videos</router-link>
            <hr>
            <router-link to="/about">About</router-link>
            <router-link to="/login">Login</router-link>
        </ul>
    </header>
</template>

<style>
header{
    width:30%;
    height: 100%;
}
a{
    color:black;
}
ul{
    display: flex;
    flex-direction: column;
    font-size: 2rem;
}
hr{
    width:30%;
}
</style>