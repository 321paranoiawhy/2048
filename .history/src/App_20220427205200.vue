<template>
    <router-view />
</template>

<style lang="scss">
// 字体
@font-face {
    font-family: Merriweather-Regular;
    src: url(/src/assets/fonts/Merriweather-Regular.ttf);
}
#app {
    font-family: Merriweather-Regular;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
