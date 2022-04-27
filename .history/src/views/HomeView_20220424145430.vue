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
    <div>{{ tempArray }}</div>
</template>

<script>
// @ is an alias to /src
export default {
    name: "HomeView",
    data() {
        return {
            numberArray: [2, 4],
            numberProbalityArray: [0.9, 0.1],
        };
    },
    computed: {
        // 由 numberProbalityArray 生成临时数组
        // [0.9, 0.1] -> [0.9, 1]
        tempArray: function () {
            return this.numberProbalityArray.map((item, index) =>
                this.numberProbalityArray
                    .slice(0, index + 1)
                    .reduce(
                        (previousValue, currentValue) =>
                            previousValue + currentValue
                    )
            );
        },
    },
    methods: {
        filterRandomNumber(number) {
            for (let i = 0; i < array.length; i++) {}
        },
        initializeArray(numberArray, numberProbalityArray) {
            // 生成元素为随机数 0 ~ 1 的数组 (含 0 不含 1)
            let randomArray = [].map((item, index) => (item = Math.random()));
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
