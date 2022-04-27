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
            numberProbalityArray: [0.9, 0.1],
        };
    },
    computed: {
        tempArray: this.numberProbalityArray.map((item, index) =>
            this.numberProbalityArray
                .slice(0, index + 1)
                .reduce(
                    (previousValue, currentValue) =>
                        previousValue + currentValue
                )
        ),
    },
    methods: {
        filterRandomNumber(number) {
            for (let i = 0; i < array.length; i++) {
                switch (array[i]) {
                    case numberProbalityArray[0]:
                        array[i] = 0.1;
                        break;
                    case 1:
                        array[i] = 0.9;
                        break;
                    default:
                        array[i] = 0.5;
                        break;
                }
            }
        },
        initializeArray(numberArray, numberProbalityArray) {
            let randomArray = [];
            for (let i = 0; i < numberArray.length; i++) {
                // 生成 0 ~ 1 随机数 (含 0 不含 1)
                randomArray[i] = Math.random();
            }
            // randomArray.map((item) => (item < numberProbalityArray[0] ? 2 : 4));
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
        console.log(tempArray);
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
