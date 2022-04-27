<template>
    <div v-for="(item, index) in array" v-bind:key="index">1</div>
</template>

<script>
// @ is an alias to /src
export default {
    name: "HomeView",
    setup() {
        let array = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];
        return array;
    },
};
</script>

<style lang="scss"></style>
