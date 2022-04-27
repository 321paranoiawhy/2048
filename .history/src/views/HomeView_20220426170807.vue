<template>
    <h2>2048</h2>
    <div class="features">
        <img
            src="../assets/images/CarbonUndo.svg"
            alt="Undo"
            @click="undo()"
        /><img
            src="../assets/images/CarbonReset.svg"
            alt="Reset"
            @click="reset()"
        />
        <div>
            <span>Undo</span>
            <span>Replay</span>
        </div>
    </div>
    <div class="up">
        <div class="icon">
            <img
                src="../assets/images/MdiArrowUpCircleOutline.svg"
                alt="Up"
                @click="mergeUp()"
            />
            <span>W</span>
        </div>
        <h4>Press UpArrow or W</h4>
    </div>
    <div class="container">
        <div class="left">
            <div class="icon">
                <img
                    src="../assets/images/IconoirLeftRoundArrow.svg"
                    alt="Left"
                    @click="mergeLeft()"
                />
                <span>A</span>
            </div>
            <h4>Press LeftArrow or A</h4>
        </div>
        <!-- 创建 2048 布局 -->
        <div class="layout">
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
            <div class="icon">
                <img
                    src="../assets/images/IconoirRightRoundArrow.svg"
                    alt="Right"
                    @click="mergeRight()"
                />
                <span>D</span>
            </div>
            <h4>Press RightArrow or D</h4>
        </div>
    </div>
    <div class="down">
        <div class="icon">
            <img
                src="../assets/images/MdiArrowDownCircleOutline.svg"
                alt="Down"
                @click="mergeDown()"
            />
            <span>S</span>
        </div>
        <h4>Press DownArrow or S</h4>
    </div>
</template>

<script>
export default {
    name: "HomeView",
    data() {
        return {
            // 初始数字
            initialFillableNumbers: [2, 4],
            // 初始数字概率
            numberProbabilityArray: [0.9, 0.1],
            // 初始数组大小
            size: 4,
            // 初始数字个数
            numberOfInitialRandomNumbers: 2,
            // 每次移动合并后新增数字个数
            newNumbers: 1,
            // 数组
            array: [],
            // 获胜数字
            winNumber: 2048,
        };
    },
    created() {
        this.$nextTick().then(() => {
            this.reset();
        });
    },
    mounted() {
        // 监听键盘事件
        document.addEventListener("keydown", (e) => {
            e.preventDefault();
            // 解构
            // const { keyCode } = e;
            // https://keycode.info/
            // 红宝书中文第四版 P80
            switch (true) {
                // 38 ArrowUp    87 W
                case e.keyCode === 38 || e.keyCode === 87:
                    this.mergeUp();
                    break;
                // 40 ArrowDown    83 S
                case e.keyCode === 40 || e.keyCode === 83:
                    this.mergeDown();
                    break;
                // 37 ArrowLeft    65 A
                case e.keyCode === 37 || e.keyCode === 65:
                    this.mergeLeft();
                    break;
                // 39 ArrowRight    68 D
                case e.keyCode === 39 || e.keyCode === 68:
                    this.mergeRight();
                    break;
                default:
                    break;
            }
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
        },
        // check() 检查是否含有 2048, 如果有则弹窗提示 You Win!
        check() {
            // 如果数组中含有 this.winNumber, 则弹窗提示 You Win!
            // 如果数组中没有 this.winNumber, 且没有空位, 则弹窗提示 Game Over!
            this.array.flat().some((item) => item === this.winNumber)
                ? alert("You Win!")
                : this.array.flat().some((item) => item === null)
                ? null
                : alert("Game Over!");
        },
        /***********************************************************************/
        // 1. moveUp() 向上移动
        moveUp() {
            // i 为行索引, j 为列索引 (下同)
            for (let i = 0; i < this.size; i++) {
                // 内层须少循环一次, 避免 j + 1 超出数组索引范围 (j 不含 this.size - 1)
                for (let j = 0; j < this.size - 1; j++) {
                    // 将非空数字按顺序移动至最上方
                    if (this.array[j][i] === null) {
                        [this.array[j][i], this.array[j + 1][i]] = [
                            this.array[j + 1][i],
                            this.array[j][i],
                        ];
                    }
                }
            }
        },
        // 2. moveDown() 向下移动
        moveDown() {
            // 外层须少循环一次, 避免 i - 1 超出数组索引范围 (i 不含 0)
            for (let i = this.size - 1; i > 0; i--) {
                for (let j = 0; j < this.size; j++) {
                    // 将非空数字按顺序移动至最下方
                    if (this.array[i][j] === null) {
                        [this.array[i][j], this.array[i - 1][j]] = [
                            this.array[i - 1][j],
                            this.array[i][j],
                        ];
                    }
                }
            }
        },
        // 3. moveLeft() 向左移动
        moveLeft() {
            for (let i = 0; i < this.size; i++) {
                // 内层须少循环一次, 避免 j + 1 超出数组索引范围 (j 不含 this.size - 1)
                for (let j = 0; j < this.size - 1; j++) {
                    // 将非空数字按顺序移动至最左侧
                    if (this.array[i][j] === null) {
                        [this.array[i][j], this.array[i][j + 1]] = [
                            this.array[i][j + 1],
                            this.array[i][j],
                        ];
                    }
                }
            }
        },
        // 4. moveRight() 向右移动
        moveRight() {
            for (let i = 0; i < this.size; i++) {
                // 内层须少循环一次, 避免 j - 1 超出数组索引范围 (j 不含 this.size - 1)
                for (let j = this.size - 1; j > 0; j--) {
                    // 将非空数字按顺序移动至最右侧
                    if (this.array[i][j] === null) {
                        [this.array[i][j], this.array[i][j - 1]] = [
                            this.array[i][j - 1],
                            this.array[i][j],
                        ];
                    }
                }
            }
        },
        /*****************************************************************/
        // 合并 (merge) 的逻辑操作
        // 1. 先移动非空数字至角落
        // 2. 再合并相邻且相同的非空数字 (合并后会产生新的空值, 因此须再次移动非空数字至角落)
        // 3. 再次移动非空数字至角落
        // 4. 最后生成一定个数的新的随机数
        /*****************************************************************/
        // 1. mergeUp() 上 (向上合并)
        mergeUp() {
            // 首次移动
            this.moveUp();
            // 合并操作
            for (let i = 0; i < this.size; i++) {
                // 内层须少循环一次, 避免 j + 1 超出数组索引范围 (j 不含 this.size - 1)
                for (let j = 0; j < this.size - 1; j++) {
                    // 须事先判断是否为空位, 否则 null * 2 = 0, null + null =0
                    if (
                        this.array[j][i] === this.array[j + 1][i] &&
                        this.array[j][i] !== null &&
                        this.array[j + 1][i] !== null
                    ) {
                        // 行数小者倍增 (j < (j + 1))
                        this.array[j][i] *= 2;
                        // 行数大者置空 ((j + 1) > j)
                        this.array[j + 1][i] = null;
                    }
                }
            }
            // 再次移动
            this.moveUp();
            // 添加随机数
            this.addRandomNumber();
            // 检查
            this.check();
        },
        // 2. mergeDown() 下 (向下合并)
        mergeDown() {
            // 首次移动
            this.moveDown();
            // 外层 i 倒置循环
            // 外层须少循环一次, 避免 i - 1 超出数组索引范围 (i 不含 0)
            for (let i = this.size - 1; i > 0; i--) {
                for (let j = 0; j < this.size; j++) {
                    if (
                        this.array[i][j] === this.array[i - 1][j] &&
                        this.array[i][j] !== null &&
                        this.array[i - 1][j] !== null
                    ) {
                        // 行数大者倍增
                        this.array[i][j] *= 2;
                        // 行数小者置空
                        this.array[i - 1][j] = null;
                    }
                }
            }
            // 再次移动
            this.moveDown();
            // 添加随机数
            this.addRandomNumber();
            // 检查
            this.check();
        },
        // 3. mergeLeft() 左 (向左合并)
        mergeLeft() {
            // 首次移动
            this.moveLeft();
            for (let i = 0; i < this.size; i++) {
                // 内层须少循环一次, 避免 j + 1 超出数组索引范围 (j 不含 this.size - 1)
                for (let j = 0; j < this.size - 1; j++) {
                    if (
                        this.array[i][j] === this.array[i][j + 1] &&
                        this.array[i][j] !== null &&
                        this.array[i][j + 1] !== null
                    ) {
                        // 列数小者倍增
                        this.array[i][j] *= 2;
                        // 列数大者置空
                        this.array[i][j + 1] = null;
                    }
                }
            }
            // 再次移动
            this.moveDown();
            // 添加随机数
            this.addRandomNumber();
            // 检查
            this.check();
        },
        // 4.  mergeRight() 右 (向右合并)
        mergeRight() {
            // 首次移动
            this.moveRight();
            for (let i = 0; i < this.size; i++) {
                // 内层 j 倒置循环
                // 内层须少循环一次, 避免 j - 1 超出数组索引范围 (j 不含 0)
                for (let j = this.size - 1; j > 0; j--) {
                    if (
                        this.array[i][j] === this.array[i][j - 1] &&
                        this.array[i][j] !== null &&
                        this.array[i][j - 1] !== null
                    ) {
                        // 列数大者倍增
                        this.array[i][j] *= 2;
                        // 列数小者置空
                        this.array[i][j - 1] = null;
                    }
                }
            }
            // 再次移动
            this.moveRight();
            // 添加随机数
            this.addRandomNumber();
            // 检查
            this.check();
        },
        /*****************************************************************/
        addRandomNumber() {
            // 二维数组先拍平, 再过滤掉假值(这里即 null)后取 this.newNumbers 个元素
            let randomNumberArray = this.initializedArray()
                .flat()
                .filter(Boolean)
                .slice(0, this.newNumbers);
            if (this.array.flat().filter(Boolean).length < this.newNumbers) {
                return;
            }
            for (let i = 0; i < this.newNumbers; i++) {
                let tempRandomNumber = Math.floor(
                    Math.random() * (this.size * this.size)
                );
                // 在数组空位 (null) 上填充新的随机数 tempRandomNumber,总个数为 this.newNumbers
                if (
                    this.array[Math.floor(tempRandomNumber / this.size)][
                        tempRandomNumber % this.size
                    ] === null
                ) {
                    this.array[Math.floor(tempRandomNumber / this.size)][
                        tempRandomNumber % this.size
                    ] = randomNumberArray[i];
                } else {
                    --i;
                }
            }
            // if (this.array.flat().indexOf(null) === -1) {
            //     alert("Game Over!");
            //     // 返回 (跳出当前函数)
            //     return;
            // }
        },
        // TODO 撤回操作
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
.icon {
    display: flex;
    justify-content: center;
    align-items: center;
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
// 布局 边框线
.row :nth-child(n) {
    border-left: 2px solid;
    border-top: 2px solid;
}
.row :nth-child(4) {
    border-right: 2px solid;
    // border-bottom: 1px solid;
}
.layout {
    // 画下底边框线
    border-bottom: 2px solid;
}
.column {
    width: 50px;
    height: 50px;
}
img {
    cursor: pointer;
}
span {
    // inline-block
    display: inline-block;
    text-align: center;
    margin-left: 10px;
    // width: 32px;
    min-width: 32px;
    height: 32px;
    // line-height 同 height 即可垂直居中
    line-height: 32px;
    background-color: crimson;
    border-radius: 0.4rem;
    cursor: pointer;
}
// 定义数字显示样式 (2 4 8 16 32 64 128 256 512 1024 2048)
.class2 {
    background: #00ffbb;
}
.class4 {
    background: #2276d2;
}
.class8 {
    background: #be0aff;
}
.class16 {
    background: #580aff;
}
.class32 {
    background: #147df5;
}
.class64 {
    background: #0aefff;
}
.class128 {
    background: #0aff99;
}
.class256 {
    background: #a1ff0a;
}
.class512 {
    background: #deff0a;
}
.class1024 {
    background: #ffd300;
}
.class2048 {
    background: #ff8700;
}
</style>
