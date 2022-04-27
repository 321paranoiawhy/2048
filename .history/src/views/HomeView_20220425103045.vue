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
    <div>tempArray {{ tempArray }}</div>
    <div>testArray {{ testArray }}</div>
    <div>array {{ array }}</div>
    <div @click="reset()">Reset</div>
</template>

<script>
// @ is an alias to /src
function findElement(array, element) {}
export default {
    name: "HomeView",
    data() {
        return {
            initialFillableNumbers: [2, 4],
            numberProbabilityArray: [0.9, 0.1],
            size: 4,
            numberOfInitialRandomNumbers: 3,
        };
    },
    computed: {
        // 由 numberProbabilityArray 生成临时数组
        // 如 [0.9, 0.1] -> [0.9, 1]
        tempArray: function () {
            return this.numberProbabilityArray.map((item, index) =>
                this.numberProbabilityArray
                    .slice(0, index + 1)
                    .reduce(
                        (previousValue, currentValue) =>
                            previousValue + currentValue
                    )
            );
        },
        array: function () {
            return this.initializedArray();
        },
    },
    methods: {
        // 生成初始数组
        initializedArray() {
            /***********************************************************/
            // 1 -> randomArray
            // 2 -> mappedRandomArray
            // 3 -> initialRandomNumbers
            // 4. mappedRandomArray + initialRandomNumbers -> resultArray
            /***********************************************************/
            // 1. randomArray: 生成元素为随机数 0 ~ 1 的数组 (含 0 不含 1), 长度 numberOfInitialRandomNumbers
            let randomArray = new Array(this.numberOfInitialRandomNumbers)
                .fill(0)
                .map((item) => Math.random());
            // 2. mappedRandomArray: randomArray 中每个元素按 numberProbabilityArray 映射为 initialFillableNumbers 中的元素
            let mappedRandomArray = randomArray.map(
                (randomArrayItem) =>
                    this.initialFillableNumbers[
                        this.tempArray.findIndex(
                            (item) => item >= randomArrayItem
                        )
                    ]
            );
            // 3. initialRandomNumbers: 生成元素为随机数 0 ~ (size*size-1) 的数组, 长度 numberOfInitialRandomNumbers
            let initialRandomNumbers = Array.from(
                new Array(this.size * this.size - 1).keys()
            )
                .sort(() => Math.random() - 0.5)
                .slice(0, this.numberOfInitialRandomNumbers);
            // 4. resultArray: 由 mappedRandomArray 和 initialRandomNumbers 生成初始数组
            let resultArray = new Array(this.size).fill(
                new Array(this.size).fill(0)
            );
            for (let i = 0; i < initialRandomNumbers.length; i++) {
                console.log(Math.floor(initialRandomNumbers[i] / this.size));
                console.log(initialRandomNumbers[i] % this.size);
                resultArray[Math.floor(initialRandomNumbers[i] / this.size)][
                    initialRandomNumbers[i] % this.size
                ] = mappedRandomArray[i];
            }
            console.log(mappedRandomArray);
            console.log(initialRandomNumbers);
            console.log(resultArray);
            return resultArray;
        },
        // TODO 随机添加一个数
        addRandomNumber() {},
        // 重置游戏
        reset() {
            this.initializedArray();
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
        // testArray
        let testArray = [
            [0, 0, 0, undefined],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];
        return {
            testArray,
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
.column {
    width: 20px;
    height: 20px;
}
</style>
