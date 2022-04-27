<template>
    <!-- 创建 2048 4 x 4 布局 -->
    <div v-for="(row, rowIndex) in array" v-bind:key="rowIndex" class="row">
        <div
            v-for="(column, columnIndex) in row"
            v-bind:key="columnIndex"
            class="column"
        >
            {{ row[columnIndex] }}
        </div>
    </div>
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
        return {
            array,
        };
    },
};
</script>

<style lang="scss">
.row {
    display: flex;
    justify-content: center;
    align-items: center;
    // width: 200px;
    // height: 50px;
    // border: 1px solid;
}
.column {
    border: 1px solid;
}
</style>
