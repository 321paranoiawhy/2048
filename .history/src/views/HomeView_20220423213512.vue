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
    data() {
        return {
            numberArray: [2, 4],
            numberArray: [0.1, 0.9],
        };
    },
    methods: {
        initializeArray(numberArray, numberProbalityArray) {
            let randomArray = [];
            for (let i = 0; i < numberProbalityArray.length; i++) {
                randomArray[i] = Math.random();
            }
            randomArray.map((item) => (item < numberProbalityArray[0] ? 2 : 4));

            // 生成随机数组 (0 ~ 1, 含 0, 不含 1)
            let randomArray = [Math.random(), Math.random()];
            //
            randomArray.map((item) => (item < numberProbalityArray[0] ? 2 : 4));
        },
        addRandomNumber() {},
        paintNumberColor() {},
    },
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
}
.row :nth-child(n) {
    border-left: 1px solid;
    border-top: 1px solid;
}
.row :nth-child(4) {
    border-right: 1px solid;
    // border-bottom: 1px solid;
}
</style>
