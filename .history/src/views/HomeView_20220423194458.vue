<template>
    <div v-for="(row, rowIndex) in array" v-bind:key="rowIndex">
        <div v-for="(column, columnIndex) in row" v-bind:key="columnIndex">
            {{ row[columnIndex] }}
        </div>
    </div>
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
