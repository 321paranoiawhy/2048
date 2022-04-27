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
    <div @click="reset()">Reset</div>
</template>

<script>
// @ is an alias to /src
function findElement(array, element) {}
export default {
    name: "HomeView",
    data() {
        return {
            numberArray: [2, 4],
            numberProbalityArray: [0.9, 0.1],
            size: 4,
            numberOfInitialNumbers: 2,
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
        aCoupleOfRandomNumbers() {
            // 生成一对随机数 [numberOne, numberTwo]
            new Array(this.size * this.size - 1)
                .fill(0)
                .sort(function () {
                    return Math.random > 0.5;
                })
                .slice(0, this.numberOfInitialNumbers + 1);
            let numberOne = Math.round(
                Math.random() * (this.size * this.size - 1)
            );
            let numberTwo = Math.round(
                Math.random() * (this.size * this.size - 1)
            );
            return numberOne === numberTwo
                ? randomACoupleOfNumbers()
                : [numberOne, numberTwo];
        },
        randomTwoNumbers(length) {
            // 生成 length 组随机数(互异)
            let tempArray = [];
            for (let i = 0; i < length; i++) {
                this.aCoupleOfRandomNumbers();
                tempArray.push(this.aCoupleOfRandomNumbers());
            }
            return tempArray;
        },
        initializeArray(numberArray, numberProbalityArray) {
            // 1. 生成元素为随机数 0 ~ 1 的数组 (含 0 不含 1), 长度 numberArray.length
            let randomArray = new Array(numberArray.length)
                .fill(0)
                .map((item) => Math.random());
            // 2. mappedRandomArray: randomArray 中每个元素按 numberProbalityArray 映射为 numeberArray
            let mappedRandomArray = randomArray.map(
                (randomArrayItem) =>
                    numberArray[
                        numberProbalityArray.findIndex(
                            (item) => item >= randomArrayItem
                        )
                    ]
            );
            // 3. 生成 mappedRandomArray 各元素对应位置
            let positionArray = this.randomTwoNumbers(numberArray.length);
        },
        addRandomNumber() {},
        // 重置游戏
        reset() {
            this.initializeArray(this.numberArray, this.numberProbalityArray);
        },
        // 上一步(撤回)
        undo() {},
        // 合并
        // 1. 上
        // 2. 右
        // 3. 下
        // 4. 左
        // 给数字上色
        paintNumberColor() {},
    },
    setup() {
        // test
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
