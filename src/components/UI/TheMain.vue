<template>
    <div>
        <main>
            <div class="content--wrapper">
                <h1>This is a <span>place</span> where you learn <span>about</span> most known <span>techonoliges</span>
                </h1>
                <a href="#" class="content--wrapper-link">Why this page?</a>
                <a href="#">What is this about?</a>
                <!-- <img src="@/assets/58f8bcf70ed2bdaf7c128307.png" alt=""> -->
            </div>
        </main>
    </div>
</template>

<style scoped>
img {
    right: 40%;
    bottom: 10%;

    width: 64px !important;
    height: 64px !important;

    position: absolute !important;

    animation: hoping 1s infinite;
}

@keyframes hoping {
    0% {
        margin-top: 80vh
    }

    50% {
        margin-top: 82vh;
    }

    100% {
        margin-top: 80vh;
    }
}

.content--wrapper {
    position: relative;
    z-index: 10;
    padding: 10rem 7rem 7rem 7rem;
    text-align: center;
}

.content--wrapper-link {
    background: linear-gradient(315deg, #42d392 25%, #647eff);
    padding: 1rem;
    margin-right: 2rem;
    border-radius: 10px;

}

img {
    position: absolute;
    width: 100vw;
    top: 0;
    height: 100vh;
    right: 48%;
    margin-top: 80vh;
}

main {
    width: 100%;
    height: 90vh;
}

h1 {
    font-family: "Open-sans";
    font-size: 4.5rem;
    text-align: center;
    font-weight: 900;
    color: black;
    margin-bottom: 3rem;
    letter-spacing: -1.5px;
}</style>