<template>
    <div v-for="(item, index) in array" v-bind:key="index">{{ item }}</div>
</template>

<script>
// @ is an alias to /src
export default {
    name: "HomeView",
    setup(props, ctx) {
        let array = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];
        return {
            array,
        };
    },
};
</script>

<style lang="scss"></style>
