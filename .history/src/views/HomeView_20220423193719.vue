<template>
    <div v-for="(item, index) in array" v-bind="item">1</div>
</template>

<script>
// @ is an alias to /src
export default {
    name: "HomeView",
    setup(props) {
        let array = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];
    },
};
</script>

<style lang="scss"></style>
