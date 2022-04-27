<template>
    <img src="../assets/images/IconoirUpRoundArrow.svg" alt="Up" />
    <div class="container">
        <img src="../assets/images/IconoirLeftRoundArrow.svg" alt="Left" />
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
    </div>
    <img src="../assets/images/IconoirDownRoundArrow.svg" alt="Down" />

    <img src="../assets/images/IconoirRightRoundArrow.svg" alt="Right" />
    <img src="../assets/images/IconoirRestart.svg" alt="Restart" />
    <img src="../assets/images/IconoirUndoCircle.svg" alt="Undo" />
    <img src="../assets/images/MdiArrowUpCircleOutline.svg" alt="Up" />
    <img src="../assets/images/MdiArrowDownCircleOutline.svg" alt="Down" />

    <div>Press LeftArrow or A</div>
    <div>Press RightArrow or D</div>
    <div>Press UpArrow or D</div>
    <div>Press DownArrow or D</div>
    <button @click="reset()">Reset</button>
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
            numberOfInitialRandomNumbers: 2,
            // array,
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
            let resultArray = Array.from({ length: this.size }, (item) =>
                new Array(this.size).fill(0)
            );
            for (let i = 0; i < initialRandomNumbers.length; i++) {
                resultArray[Math.floor(initialRandomNumbers[i] / this.size)][
                    initialRandomNumbers[i] % this.size
                ] = mappedRandomArray[i];
            }
            return resultArray;
        },
        // array: function () {
        //     return this.initializedArray();
        // },
        // TODO 随机添加一个数
        addRandomNumber() {},
        // 重置游戏
        // reset() {
        //     this.array;
        // },
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
    emits: ["reset"],
    setup(props, ctx) {
        // testArray
        let testArray = [
            [0, 0, 0, null],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];
        let reset = () => {
            array = initializedArray();
        };
        return {
            testArray,
            reset,
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
.column {
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
// .container :last-child {
//     border-bottom: 1px solid;
// }
.column {
    width: 50px;
    height: 50px;
}
</style>
