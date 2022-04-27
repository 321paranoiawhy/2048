<template>
    <h2>2048</h2>
    <div class="header">
        <div>
            <button>Get Started</button>
        </div>
        <div>
            <img
                src="../assets/images/TeenyiconsGithubOutline.svg"
                alt="Github"
            />
            <button>GitHub</button>
        </div>
        <div>
            <img src="../assets/images/MdiBlogger.svg" alt="Blog" />
            <button>Blog</button>
        </div>
        <div>
            <img
                src="../assets/images/TeenyiconsEnvelopeOutline.svg"
                alt="Email"
            />
            <button>Email</button>
        </div>
        <div>
            <button>About</button>
        </div>
        <div>
            <button>Q & A</button>
        </div>
    </div>
    <div class="features">
        <img
            src="../assets/images/CarbonUndo.svg"
            alt="Undo"
            @click="undo()"
            :class="{ native: lastFlag }"
        />
        <img
            src="../assets/images/CarbonRedo.svg"
            alt="redo"
            @click="redo()"
            :class="{ native: nextFlag }"
        />
        <img
            src="../assets/images/CarbonReset.svg"
            alt="Reset"
            @click="reset()"
        />
        <span class="undo" @click="undo()">Undo</span>
        <span class="redo" @click="redo()">Redo</span>
        <span class="replay" @click="reset()">Replay</span>
    </div>
    <div class="up">
        <div class="icon">
            <img
                src="../assets/images/MdiArrowUpCircleOutline.svg"
                alt="Up"
                @click="mergeUp()"
            />
            <span class="direction" @click="mergeUp()">W</span>
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
                <span class="direction" @click="mergeLeft()">A</span>
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
                <span class="direction" @click="mergeRight()">D</span>
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
            <span class="direction" @click="mergeDown()">S</span>
        </div>
        <h4>Press DownArrow or S</h4>
    </div>
    <Footer></Footer>
</template>

<script>
import Footer from "@/components/footer.vue";
export default {
    name: "HomeView",
    components: {
        Footer,
    },
    data() {
        return {
            // 初始数字
            initialFillableNumbers: [2, 4],
            // 初始数字概率
            numberProbabilityArray: [0.9, 0.1],
            // 初始数组大小
            size: 5,
            // 初始数字个数
            numberOfInitialRandomNumbers: 2,
            // 每次移动合并后新增数字个数
            // !!!!!! newNumbers <= numberOfInitialRandomNumbers
            newNumbers: 1,
            // 数组
            array: [],
            // 获胜数字
            winNumber: 2048,
            // undo
            lastArray: [],
            // redo
            nextArray: [],
            lastFlag: true,
            nextFlag: false,
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
                    this.check();
                    break;
                // 40 ArrowDown    83 S
                case e.keyCode === 40 || e.keyCode === 83:
                    this.mergeDown();
                    this.check();
                    break;
                // 37 ArrowLeft    65 A
                case e.keyCode === 37 || e.keyCode === 65:
                    this.mergeLeft();
                    this.check();
                    break;
                // 39 ArrowRight    68 D
                case e.keyCode === 39 || e.keyCode === 68:
                    this.mergeRight();
                    this.check();
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
            // 3. initialRandomNumbers:
            // 先生成元素为随机数 0 ~ (size*size-1) 的数组
            // 再乱序排列取 numberOfInitialRandomNumbers 个元素组成数组 initialRandomNumbers
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
        // addRandomNumber() 添加随机数
        addRandomNumber() {
            // 1. this.array 空值索引数组 (i 行 j 列)
            let truthyIndexArray = [];
            for (let i = 0; i < this.array.length; i++) {
                for (let j = 0; j < this.array.length; j++) {
                    if (this.array[i][j] === null) {
                        truthyIndexArray.push([i, j]);
                    }
                }
            }
            // 2. 随机数位置数组
            let positionArray = Array.from(
                new Array(truthyIndexArray.length).keys()
            )
                .sort(() => Math.random() - 0.5)
                .slice(0, this.newNumbers);
            // 3. 随机数(个数: this.newNumbers)
            let randomNumberArray = this.initializedArray()
                .flat()
                .filter(Boolean)
                .slice(0, this.newNumbers);
            // 4. 更新 this.array
            for (let i = 0; i < this.newNumbers; i++) {
                // positionArray[i] 是 truthyIndexArray 中的索引
                // truthyIndexArray[positionArray[i]] 是 this.array 空值索引
                // Math.floor(truthyIndexArray[positionArray[i]] / this.size) 行数
                // truthyIndexArray[positionArray[i]] % this.size 列数
                // 在 this.array 中插入随机数: randomNumberArray[i]
                this.array[truthyIndexArray[positionArray[i]][0]][
                    truthyIndexArray[positionArray[i]][1]
                ] = randomNumberArray[i];
            }
        },
        // 数组转置
        // 见 https://segmentfault.com/a/1190000020206880
        transpose(arr) {
            // 将数组转置 (不改变 this.array)
            return arr[0].map(function (column, i) {
                return arr.map(function (row) {
                    return row[i];
                });
            });
        },
        /***********************************************************************/
        // 向左移动最简单, 向右移动只需在向左移动的代码上加上 reverse()
        // 向上移动等价于转置后向左移动
        // 向下移动等价于转置后向右移动
        // 1. moveUp() 向上移动
        moveUp() {
            // 将this.array 转置为 tempArray
            let tempArray = this.transpose(this.array);
            // 转置前向上移动  等价于  转置后向左移动
            for (let i = 0; i < this.size; i++) {
                let tempArrayOne = tempArray[i].filter(Boolean);
                let tempArrayTwo = new Array(
                    this.size - tempArrayOne.length
                ).fill(null);
                // 合并两个数组得到 this.array 的第 i 行
                // tempArrayOne + tempArrayTwo(真值数组在左, 假值数组在右)
                tempArray[i] = tempArrayOne.concat(tempArrayTwo);
            }
            // tempArray 转置为 新的 this.array
            this.array = JSON.parse(JSON.stringify(this.transpose(tempArray)));
        },
        // 2. moveDown() 向下移动
        moveDown() {
            // 将this.array 转置为 tempArray
            let tempArray = this.transpose(this.array);
            // 转置前向下移动  等价于  转置后向右移动
            for (let i = 0; i < this.size; i++) {
                let tempArrayOne = tempArray[i].filter(Boolean);
                let tempArrayTwo = new Array(
                    this.size - tempArrayOne.length
                ).fill(null);
                // 合并两个数组
                // tempArrayTwo + tempArrayOne(假值数组在左, 真值数组在右)
                tempArray[i] = tempArrayTwo.concat(tempArrayOne);
            }
            // tempArray 转置为 新的 this.array
            this.array = JSON.parse(JSON.stringify(this.transpose(tempArray)));
        },
        // 3. moveLeft() 向左移动
        moveLeft() {
            // i 表示行数
            for (let i = 0; i < this.size; i++) {
                // 过滤掉假值(新数组中会保持原有顺序)
                let tempArrayOne = this.array[i].filter(Boolean);
                // 待合并的空值数组
                let tempArrayTwo = new Array(
                    this.size - tempArrayOne.length
                ).fill(null);
                // 合并两个数组得到 this.array 的第 i 行
                // tempArrayOne + tempArrayTwo(真值数组在左, 假值数组在右)
                this.array[i] = tempArrayOne.concat(tempArrayTwo);
            }
        },
        // 4. moveRight() 向右移动
        moveRight() {
            // i 表示行数
            for (let i = 0; i < this.size; i++) {
                // 过滤掉假值(新数组中会保持原有顺序)
                let tempArrayOne = this.array[i].filter(Boolean);
                // 待合并的空值数组
                let tempArrayTwo = new Array(
                    this.size - tempArrayOne.length
                ).fill(null);
                // 合并两个数组
                // tempArrayTwo + tempArrayOne(假值数组在左, 真值数组在右)
                this.array[i] = tempArrayTwo.concat(tempArrayOne);
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
            // 记录合并前的数组 (JSON实现二维数组的深复制)
            this.lastArray = JSON.parse(JSON.stringify(this.array));
            // 首次移动
            this.moveUp();
            // 合并
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
            // 如果移动前后数组不变且数组中无空值, 则提示 Game Over!
            // 注意这里使用JSON.stringify() 比较两数组是否相同
            if (
                JSON.stringify(this.array) === JSON.stringify(this.lastArray) &&
                !this.array.flat().includes(null)
            ) {
                return alert("Game Over!");
            }
            // 添加随机数
            this.addRandomNumber();
            // nextArray
            this.nextArray = JSON.parse(JSON.stringify(this.array));
        },
        // 2. mergeDown() 下 (向下合并)
        mergeDown() {
            // 记录合并前的数组 (JSON实现二维数组的深复制)
            this.lastArray = JSON.parse(JSON.stringify(this.array));
            // 首次移动
            this.moveDown();
            // 合并
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
            // 如果移动前后数组不变且数组中无空值, 则提示 Game Over!
            // 注意这里使用JSON.stringify() 比较两数组是否相同
            if (
                JSON.stringify(this.array) === JSON.stringify(this.lastArray) &&
                !this.array.flat().includes(null)
            ) {
                return alert("Game Over!");
            }
            // 添加随机数
            this.addRandomNumber();
            // nextArray
            this.nextArray = JSON.parse(JSON.stringify(this.array));
        },
        // 3. mergeLeft() 左 (向左合并)
        mergeLeft() {
            // 记录合并前的数组 (JSON实现二维数组的深复制)
            this.lastArray = JSON.parse(JSON.stringify(this.array));
            // 首次移动
            this.moveLeft();
            // 合并
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
            this.moveLeft();
            // 如果移动前后数组不变且数组中无空值, 则提示 Game Over!
            // 注意这里使用JSON.stringify() 比较两数组是否相同
            if (
                JSON.stringify(this.array) === JSON.stringify(this.lastArray) &&
                !this.array.flat().includes(null)
            ) {
                return alert("Game Over!");
            }
            // 添加随机数
            this.addRandomNumber();
            // nextArray
            this.nextArray = JSON.parse(JSON.stringify(this.array));
        },
        // 4.  mergeRight() 右 (向右合并)
        mergeRight() {
            // 记录合并前的数组 (JSON实现二维数组的深复制)
            this.lastArray = JSON.parse(JSON.stringify(this.array));
            // 首次移动
            this.moveRight();
            // 合并
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
            // 如果移动前后数组不变且数组中无空值, 则提示 Game Over!
            // 注意这里使用JSON.stringify() 比较两数组是否相同
            if (
                JSON.stringify(this.array) === JSON.stringify(this.lastArray) &&
                !this.array.flat().includes(null)
            ) {
                return alert("Game Over!");
            }
            // 添加随机数
            this.addRandomNumber();
            // nextArray
            this.nextArray = JSON.parse(JSON.stringify(this.array));
        },
        /*****************************************************************/
        // undo() 返回上一步(撤回)
        undo() {
            // 回退到合并前的数组 (JSON实现二维数组的深复制)
            this.array = JSON.parse(JSON.stringify(this.lastArray));
        },
        redo() {
            // 撤销回退
            this.array = JSON.parse(JSON.stringify(this.nextArray));
        },
        // reset() 重置游戏
        reset() {
            this.array = this.initializedArray();
        },
        // check() 检查是否含有 2048, 如果有则弹窗提示 You Win!
        check() {
            // 如果不能再次合并 !false <=> true
            if (!this.checkMergeOrNot()) {
                return alert("Game Over!");
            }
            // 如果数组中含有 this.winNumber, 则弹窗提示 You Win!
            if (this.array.flat().some((item) => item === this.winNumber)) {
                return alert("You Win!");
            }
        },
        // 检查是否可以再次合并
        checkMergeOrNot() {
            // 外层循环和内层循环均须少一次循环
            for (let i = 0; i < this.size - 1; i++) {
                for (let j = 0; j < this.size - 1; j++) {
                    // 从左上角 this.array[0][0] 开始判断任意相邻两数是否相同
                    // this.array[i][j] 相邻数 i 行 j 列
                    // 右侧 this.array[i][j + 1] i 行 j+1 列
                    // 下方 this.array[i + 1][j] i+1 行 j 列
                    // this.array[i][j] 等于 右侧 或 下方 数字, 即表明可以再次合并
                    if (
                        this.array[i][j] === this.array[i][j + 1] ||
                        this.array[i][j] === this.array[i + 1][j]
                    ) {
                        // 可以再次合并
                        return true;
                    }
                }
            }
            // 不能再次合并
            return false;
        },
    },
};
</script>

<style lang="scss" scoped>
// 定义每个格子的尺寸
$size: 40px;
// 定义边框颜色
$borderColor: #3f3f3f;
.header {
    display: flex;
    justify-content: center;
    align-items: center;
    & div {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
    }
}
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
    display: grid;
    // 宽度随内容自适应
    width: fit-content;
    // grid 容器水平居中
    margin: 0 auto 20px;
    grid-template-areas:
        "firstRowFirstColumn" "firstRowSecondColumn" "firstRowThirdColumn"
        "secondRowFirstColumn" "secondRowSecondColumn" "secondRowThirdColumn";
    // 行高
    grid-template-rows: repeat(2, 50px);
    // 列宽
    grid-template-columns: repeat(3, 100px);
    // 子元素水平居中
    justify-items: center;
    // 子元素垂直居中
    align-items: center;
    & img :nth-child(1) {
        grid-area: firstRowFirstColumn;
    }
    & img :nth-child(2) {
        grid-area: firstRowSecondColumn;
    }
    & img :nth-child(3) {
        grid-area: firstRowThirdColumn;
    }
    & span :nth-child(1) {
        grid-area: secondRowFirstColumn;
    }
    & span :nth-child(2) {
        grid-area: secondRowSecondColumn;
    }
    & span :nth-child(3) {
        grid-area: secondRowThirdColumn;
    }
    // undo redo 宽度
    & .undo,
    & .redo {
        width: 55px;
    }
    // replay 宽度
    & .replay {
        width: 70px;
    }
    & span {
        margin-left: 0;
    }
}
// 设置 h4 下外边距 0 (使得父元素整体随 2048 网格布局垂直居中)
h4 {
    margin-bottom: 0;
}
button {
    border-radius: 0.5rem;
    // 谷歌蓝 按钮
    color: white;
    background: #4c8ffb;
    border: 1px #3079ed solid;
    box-shadow: inset 0 1px 0 #80b0fb;
}
/***********************************************/
// 整体思路: 先加上所有的边框, 再处理重叠的边框
// 1. 给每个数字所在位置加四周边框 (中间横竖边框线均重叠)
.column {
    // 宽高尺寸 $size
    width: $size;
    height: $size;
    border: 1px solid;
    border-color: $borderColor;
}
// 2. 去除竖直方向重叠的边框
// 通用兄弟组合器 (匹配所有跟随在指定元素之后的兄弟元素)
// 每对相邻盒子 左边框宽度置0
.column ~ .column {
    border-left-width: 0;
}
// 3. 去除水平方向重叠的边框
.row ~ .row .column {
    border-top-width: 0;
}
/***********************************************/

// 布局 边框线
// .row :nth-child(n) {
//     border-left: 2px solid;
//     border-top: 2px solid;
// }
// 这里伪类选择器中数字 应随 size 同步变化 (目前难以做到, 故放弃这一思路: 先画绝大部分边框线最后补充缺少的边框线)
// .row :nth-child(4) {
//     border-right: 2px solid;
// }
// .layout {
//     // 画下底边框线
//     border-bottom: 2px solid;
// }
// .column {
//     width: 50px;
//     height: 50px;
//     // 暴力添加边框
//     border: 2px solid;
// }

img {
    cursor: pointer;
}
span {
    // inline-block
    display: inline-block;
    text-align: center;
    margin-left: 10px;
    width: 32px;
    height: 32px;
    // line-height 同 height 即可垂直居中
    line-height: 32px;
    background-color: #ff9900;
    color: #000000;
    border-radius: 0.4rem;
    cursor: pointer;
}
// 定义数字显示样式 (2 4 8 16 32 64 128 256 512 1024 2048)
.class2 {
    background: #00ffbb;
}
.class4 {
    background: #4c8ffb;
    color: white;
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
