<template>
    <h2>2048</h2>
    <div class="features">
        <img src="../assets/images/CarbonUndo.svg" alt="Undo" /><img
            src="../assets/images/CarbonReset.svg"
            alt="Restart"
        />
    </div>
    <div class="up">
        <img src="../assets/images/MdiArrowUpCircleOutline.svg" alt="Up" />
        <h4>Press UpArrow or W</h4>
    </div>
    <div class="container">
        <div class="left">
            <img src="../assets/images/IconoirLeftRoundArrow.svg" alt="Left" />
            <h4>Press LeftArrow or A</h4>
        </div>
        <!-- 创建 2048 布局 -->
        <div>
            <div
                v-for="(row, rowIndex) in array"
                v-bind:key="rowIndex"
                class="row"
            >
                <div
                    v-for="(column, columnIndex) in row"
                    v-bind:key="columnIndex"
                    class="column"
                    :class="{
                        class2: row[columnIndex] === 2,
                        class4: row[columnIndex] === 4,
                        class8: row[columnIndex] === 8,
                        class16: row[columnIndex] === 16,
                        class32: row[columnIndex] === 32,
                        class64: row[columnIndex] === 64,
                        class128: row[columnIndex] === 128,
                        class256: row[columnIndex] === 256,
                        class512: row[columnIndex] === 512,
                        class1024: row[columnIndex] === 1024,
                        class2048: row[columnIndex] === 2048,
                    }"
                >
                    {{ row[columnIndex] }}
                </div>
            </div>
        </div>
        <div class="right">
            <img
                src="../assets/images/IconoirRightRoundArrow.svg"
                alt="Right"
            />
            <h4>Press RightArrow or D</h4>
        </div>
    </div>
    <div class="down">
        <img src="../assets/images/MdiArrowDownCircleOutline.svg" alt="Down" />
        <h4>Press DownArrow or S</h4>
    </div>

    <button @click="reset()">Reset</button>
</template>

<script>
export default {
    name: "HomeView",
    data() {
        return {
            initialFillableNumbers: [2, 4],
            numberProbabilityArray: [0.9, 0.1],
            size: 4,
            numberOfInitialRandomNumbers: 2,
            array: [],
        };
    },
    created() {
        this.$nextTick().then(() => {
            this.reset();
        });
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
        // array: function () {
        //     return this.initializedArray();
        // },
    },
    methods: {
        // initializedArray() 生成初始数组
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
                new Array(this.size).fill(null)
            );
            for (let i = 0; i < initialRandomNumbers.length; i++) {
                resultArray[Math.floor(initialRandomNumbers[i] / this.size)][
                    initialRandomNumbers[i] % this.size
                ] = mappedRandomArray[i];
            }
            return resultArray;
        },
        // reset() 重置游戏
        reset() {
            this.array = this.initializedArray();
            console.log(this.array);
        },
        // check() 检查是否含有 2048, 如果有则弹窗提示 You Win!
        check() {
            // 如果数组中含有2048, 则弹窗提示 You Win!
            // 如果数组中没有2048, 且没有空位, 则弹窗提示 Game Over!
            this.array.flat().some((item) => item === 2048)
                ? alert("You Win!")
                : this.array.flat().some((item) => item === null)
                ? null
                : alert("Game Over!");
        },
        /***********************************************************/
        // 先合并, 后生成新的随机数
        // 1. 合并
        // 1.1 mergeUP() 上 (向上合并)
        mergeUP() {
            // i 为行索引, j 为列索引 (下同)
            for (let i = 0; i < this.size; i++) {
                // 内层须少循环一次, 避免 j + 1 超出数组索引范围
                for (let j = 0; j < this.size - 1; j++) {
                    if (this.array[j][i] === this.array[j + 1][i]) {
                        // 行数小者倍增 (j < (j + 1))
                        this.array[j][i] *= 2;
                        // 行数大者置空 ((j + 1) > j)
                        this.array[j + 1][i] = null;
                    }
                }
            }
        },
        // 1.2 mergeDown() 下 (向下合并)
        mergeDown() {
            // 外层 i 倒置循环
            for (let i = this.size - 1; i >= 0; i--) {
                for (let j = 0; j < this.size; j++) {
                    // 内层须少循环一次, 避免 j + 1 超出数组索引范围

                    if (this.array[i][j] === this.array[i - 1][j]) {
                        // 行数大者倍增
                        this.array[i][j] *= 2;
                        // 行数小者置空
                        this.array[i - 1][j] = null;
                    }
                }
            }
        },
        // 2.1 右
        mergeRight() {
            for (let i = 0; i < this.size; i++) {
                // 内层 j 倒置循环
                for (let j = this.size - 1; j >= 0; j--) {
                    if (this.array[i][j] === this.array[i][j - 1]) {
                        // 列数大者倍增
                        this.array[i][j] *= 2;
                        // 列数小者置空
                        this.array[i][j - 1] = null;
                    }
                }
            }
        },

        // 3.1 下
        // 4.1 左

        // 2. 在数组空位 (null) 上生成新的随机数
        addRandomNumber() {},
        // undo() 返回上一步(撤回)
        undo() {},
    },
    setup(props, ctx) {
        // testArray
        let testArray = [
            [0, 0, 0, null],
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

<style lang="scss" scoped>
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
.container {
    display: flex;
    justify-content: center;
    align-items: center;
}
.left {
    margin-right: 50px;
    // 设固定宽度使 2048 布局水平居中
    width: 200px;
}
.right {
    margin-left: 50px;
    width: 200px;
}
.up {
    margin-bottom: 50px;
}
.down {
    margin-top: 50px;
}
.features {
    margin: 10px auto 10px;
    & :nth-child(1) {
        margin-right: 70px;
    }
    & :nth-child(2) {
        margin-left: 70px;
    }
}
.row :nth-child(n) {
    border-left: 2px solid;
    border-top: 2px solid;
}
.row :nth-child(4) {
    border-right: 2px solid;
    // border-bottom: 1px solid;
}
// .container :last-child {
//     border-bottom: 1px solid;
// }
.column {
    width: 50px;
    height: 50px;
}

// 定义数字显示样式
.class2 {
    background: red;
}
.class4 {
    background: blue;
}
</style>
