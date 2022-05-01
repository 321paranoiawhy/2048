<template>
    <h2>2048</h2>
    <h3>Not Just 2048</h3>
    <div class="header">
        <!-- Get Started -->
        <div>
            <img
                src="../assets/images/start.svg"
                alt="Get Started"
                @click="gotoGetStarted"
            />
            <button @click="gotoGetStarted">Get Started</button>
        </div>
        <span class="span-divider"></span>
        <!-- GitHub -->
        <div>
            <a href="https://github.com/321paranoiawhy/2048" target="_blank">
                <img
                    src="../assets/images/TeenyiconsGithubOutline.svg"
                    alt="Github"
                />
            </a>
            <a href="https://github.com/321paranoiawhy/2048" target="_blank">
                <button>GitHub</button>
            </a>
        </div>
        <span class="span-divider"></span>
        <!-- Blog -->
        <div>
            <a href="https://321paranoiawhy.github.io/" target="_blank">
                <img src="../assets/images/Fa6SolidBlog.svg" alt="Blog" />
            </a>
            <a href="https://321paranoiawhy.github.io/" target="_blank">
                <button>Blog</button>
            </a>
        </div>
        <span class="span-divider"></span>
        <!-- Email -->
        <div>
            <a href="mailto:paranoiawhy@gmail.com" target="_blank">
                <img
                    src="../assets/images/TeenyiconsEnvelopeOutline.svg"
                    alt="Email"
                />
            </a>
            <a href="mailto:paranoiawhy@gmail.com" target="_blank">
                <button>Email</button>
            </a>
        </div>
        <span class="span-divider"></span>
        <!-- About -->
        <div>
            <img
                src="../assets/images/about.svg"
                alt="about"
                @click="gotoAbout"
            />
            <button @click="gotoAbout">About</button>
        </div>
        <span class="span-divider"></span>
        <!-- Q & A -->
        <div>
            <img
                src="../assets/images/question-answer-line.svg"
                alt="Question & Answer"
                @click="gotoQA"
            />
            <button @click="gotoQA">Q & A</button>
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
        <img
            src="../assets/images/AntDesignPoweroffOutlined.svg"
            alt="exit"
            @click="exit()"
        />
        <span class="undo" @click="undo()">Undo</span>
        <span class="redo" @click="redo()">Redo</span>
        <span class="replay" @click="reset()">Replay</span>
        <span class="exit" @click="exit()">Exit</span>
    </div>
    <div class="steps-scores">
        <div>Steps</div>
        <div>Scores</div>
        <span>{{ steps }}</span>
        <span>{{ scores }}</span>
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
    </div>
    <div class="container">
        <div class="setup">
            <!-- 进制 -->
            <label>Base :</label>
            <input
                v-model="base"
                @focus="removeKeyDown()"
                @blur="addKeyDown()"
            />
            <!-- 网格大小 -->
            <label>Size :</label>
            <input
                v-model="size"
                @focus="removeKeyDown()"
                @blur="addKeyDown()"
            />
            <!-- 数字数组 -->
            <label>Number Array :</label>
            <input
                v-model="initialFillableNumbers"
                @focus="removeKeyDown()"
                @blur="addKeyDown()"
            />
            <!-- 数字概率数组 -->
            <label>Number Probability Array :</label>
            <input
                v-model="numberProbabilityArray"
                @focus="removeKeyDown()"
                @blur="addKeyDown()"
            />
            <!-- 初始数字个数 -->
            <label>Number of Initial Number(s) :</label>
            <input
                v-model="numberOfInitialRandomNumbers"
                @focus="removeKeyDown()"
                @blur="addKeyDown()"
            />
            <!-- 每次移动后新增数字个数 -->
            <label>Number of New Number(s) :</label>
            <input
                v-model="newNumbers"
                @focus="removeKeyDown()"
                @blur="addKeyDown()"
            />
            <!-- 获胜数字 -->
            <label>Win Number :</label>
            <input
                v-model="winNumber"
                @focus="removeKeyDown()"
                @blur="addKeyDown()"
            />
            <!-- Play -->
            <div class="play" @click="play()">
                <img
                    src="../assets/images/IcBaselinePlayCircleOutline.svg"
                    alt="Play"
                />
                <span @click="play()">Play</span>
            </div>
        </div>
        <!-- 布局以左 -->
        <div class="left">
            <div class="icon">
                <img
                    src="../assets/images/IconoirLeftRoundArrow.svg"
                    alt="Left"
                    @click="mergeLeft()"
                />
                <span class="direction" @click="mergeLeft()">A</span>
            </div>
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
                        class1: row[columnIndex] === base * 1,
                        class2: row[columnIndex] === base * 2,
                        class3: row[columnIndex] === base * 4,
                        class4: row[columnIndex] === base * 8,
                        class5: row[columnIndex] === base * 16,
                        class6: row[columnIndex] === base * 32,
                        class7: row[columnIndex] === base * 64,
                        class8: row[columnIndex] === base * 128,
                        class9: row[columnIndex] === base * 256,
                        class10: row[columnIndex] === base * 512,
                        class11: row[columnIndex] === base * 1024,
                        class12: row[columnIndex] === base * 2048,
                        class13: row[columnIndex] === base * 4096,
                        class14: row[columnIndex] === base * 8192,
                        class15: row[columnIndex] === base * 16384,
                        class16: row[columnIndex] === base * 32768,
                        class17: row[columnIndex] === base * 65536,
                        class18: row[columnIndex] === base * 131072,
                        class19: row[columnIndex] === base * 262144,
                        class20: row[columnIndex] === base * 524288,
                    }"
                >
                    {{ row[columnIndex] }}
                </div>
            </div>
        </div>
        <!-- 布局以右 -->
        <div class="right">
            <div class="icon">
                <img
                    src="../assets/images/IconoirRightRoundArrow.svg"
                    alt="Right"
                    @click="mergeRight()"
                />
                <span class="direction" @click="mergeRight()">D</span>
            </div>
        </div>
        <!-- 记录操作步骤 -->
        <!-- 数据驱动 (record 数组) -->
        <div class="record" ref="recordScroll">
            <div v-for="(item, index) in record" v-bind:key="index">
                <!-- 示例 Step 1 : Up -->
                Step {{ index + 1 }} : {{ item }}
            </div>
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
    </div>
    <div>{{ base }}</div>
    <div>{{ size }}</div>
    <div>{{ initialFillableNumbers }}</div>
    <div>{{ numberProbabilityArray }}</div>
    <div>{{ newNumbers }}</div>
    <div>{{ winNumber }}</div>
    <Footer></Footer>
</template>

<script>
import Footer from "@/components/footer.vue";
import { useRouter } from "vue-router";

export default {
    name: "HomeView",
    components: {
        Footer,
    },
    data() {
        return {
            // 默认值 (均可由用户自定义, 高度自由和个人定制化)
            // 进制
            base: 2,
            // 数组
            array: [],
            // 初始数组大小
            size: 4,
            // 初始可选数字
            initialFillableNumbers: [2, 4],
            // 初始可选数字概率
            numberProbabilityArray: [0.9, 0.1],
            // 初始数字个数
            numberOfInitialRandomNumbers: 2,
            // 每次移动合并后新增数字个数
            // !!!!!! newNumbers <= numberOfInitialRandomNumbers
            newNumbers: 1,
            // 幂 (限定最大 20)
            exponent: 10,
            // 获胜数字 base * (2 ** exponent) (如 2 * 2 ** 10 = 2048)
            winNumber: 2048,
            // undo
            lastArray: [],
            // redo
            nextArray: [],
            // 一开始 undo redo 均不可执行 lastFlag nextFlag
            lastFlag: false,
            nextFlag: false,
            // 计数 (步骤)
            steps: 0,
            // 分数
            scores: 0,
            // 记录数组
            record: [],
            // 记录数组最后一个元素
            lastElementInRecord: "",
        };
    },
    mounted() {
        // 监听键盘事件
        document.addEventListener("keydown", this.arrowFunction);
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
    },
    methods: {
        // 箭头函数 (用作监听键盘事件的参数: 回调函数)
        arrowFunction(e) {
            e.preventDefault();
            // 解构
            const { keyCode } = e;
            // https://keycode.info/
            // 红宝书中文第四版 P80
            switch (keyCode) {
                // 多分支(case) 同一操作
                // 38 ArrowUp    87 W
                case 38:
                case 87:
                    this.mergeUp();
                    break;
                // 40 ArrowDown    83 S
                case 40:
                case 83:
                    this.mergeDown();
                    break;
                // 37 ArrowLeft    65 A
                case 37:
                case 65:
                    this.mergeLeft();
                    break;
                // 39 ArrowRight    68 D
                case 39:
                case 68:
                    this.mergeRight();
                    break;
                default:
                    break;
            }
        },
        // 鼠标聚焦 input 时移除键盘事件
        removeKeyDown() {
            document.removeEventListener("keydown", this.arrowFunction);
        },
        // 鼠标失去焦点 input 时再次添加键盘事件
        addKeyDown() {
            document.addEventListener("keydown", this.arrowFunction);
        },
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
                .fill(null)
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
                new Array(this.size * this.size).keys()
            )
                .sort(() => Math.random() - 0.5)
                .slice(0, this.numberOfInitialRandomNumbers);
            // 4. resultArray: 由 mappedRandomArray 和 initialRandomNumbers 生成初始数组
            let resultArray = Array.from({ length: this.size }, (item) =>
                Array.from({ length: this.size }).fill(null)
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
                // 在 this.array 中插入随机数: randomNumberArray[i]
                this.array[truthyIndexArray[positionArray[i]][0]][
                    truthyIndexArray[positionArray[i]][1]
                ] = randomNumberArray[i];
            }
        },
        calculateScores() {
            // 初始化分数 (置 0)
            this.scores = 0;
            // 开始计分数字
            let beginScoreNumber = this.base * 2;
            for (let i = beginScoreNumber; i <= this.winNumber; i = i * 2) {
                // 权重分别为 1, this.base, this.base*this.base...
                // 权重乘以重复次数
                this.scores +=
                    (i / beginScoreNumber) *
                    this.array.flat().filter((item) => item === i).length;
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
            // 记录合并前的数组 (JSON实现二维数组的深复制) lastArray
            this.lastArray = JSON.parse(JSON.stringify(this.array));
            // 如果数组中无空值且不能纵向合并
            if (this.checkVertical()) {
                return alert("Game Over!");
            }
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
            // 合并后检查是否含有获胜数字
            if (this.array.flat().includes(this.winNumber)) {
                return alert("You Win!");
            }
            // 再次移动
            this.moveUp();
            // 在添加随机数之前
            // 如果数组中非空值个数 大于 this.size * this.size - this.newNumbers, 即数组中空值个数 小于 this.newNumbers
            // 无法继续添加随机数, 提示 "Game Over!"
            if (
                this.array.flat().filter(Boolean).length >
                this.size * this.size - this.newNumbers
            ) {
                return alert("Game Over!");
            }
            // 添加随机数
            this.addRandomNumber();
            // 记录移动-合并-移动-添加后的数组 nextArray
            this.nextArray = JSON.parse(JSON.stringify(this.array));
            // 计数 + 1
            ++this.steps;
            // 更新分数
            this.calculateScores();
            // 追加记录
            this.record.push("Up");
            // 此时可以 undo, 更改 undoFlag 为 true
            this.undoFlag = true;
            // 使滚动条拉至当前 step
            this.$nextTick(() => {
                this.$refs.recordScroll.scrollTop =
                    this.$refs.recordScroll.scrollHeight;
            });
        },
        // 2. mergeDown() 下 (向下合并)
        mergeDown() {
            // 记录合并前的数组 (JSON实现二维数组的深复制)
            this.lastArray = JSON.parse(JSON.stringify(this.array));
            // 如果数组中无空值且不能纵向合并
            if (this.checkVertical()) {
                return alert("Game Over!");
            }
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
            // 合并后检查是否含有获胜数字
            if (this.array.flat().includes(this.winNumber)) {
                return alert("You Win!");
            }
            // 再次移动
            this.moveDown();
            // 在添加随机数之前
            // 如果数组中非空值个数 大于 this.size * this.size - this.newNumbers, 即数组中空值个数 小于 this.newNumbers
            // 无法继续添加随机数, 提示 "Game Over!"
            if (
                this.array.flat().filter(Boolean).length >
                this.size * this.size - this.newNumbers
            ) {
                return alert("Game Over!");
            }
            // 添加随机数
            this.addRandomNumber();
            // 记录移动-合并-移动-添加后的数组 nextArray
            this.nextArray = JSON.parse(JSON.stringify(this.array));
            // 计数 + 1
            ++this.steps;
            // 更新分数
            this.calculateScores();
            // 追加记录
            this.record.push("Down");
            // 此时可以 undo, 更改 undoFlag 为 true
            this.undoFlag = true;
            // 使滚动条拉至当前 step
            this.$nextTick(() => {
                this.$refs.recordScroll.scrollTop =
                    this.$refs.recordScroll.scrollHeight;
            });
        },
        // 3. mergeLeft() 左 (向左合并)
        mergeLeft() {
            // 记录合并前的数组 (JSON实现二维数组的深复制)
            this.lastArray = JSON.parse(JSON.stringify(this.array));
            // 如果数组中无空值且不能横向合并
            if (this.checkHorizontal()) {
                return alert("Game Over!");
            }
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
            // 合并后检查是否含有获胜数字
            if (this.array.flat().includes(this.winNumber)) {
                return alert("You Win!");
            }
            // 再次移动
            this.moveLeft();
            // 在添加随机数之前
            // 如果数组中非空值个数 大于 this.size * this.size - this.newNumbers, 即数组中空值个数 小于 this.newNumbers
            // 无法继续添加随机数, 提示 "Game Over!"
            if (
                this.array.flat().filter(Boolean).length >
                this.size * this.size - this.newNumbers
            ) {
                return alert("Game Over!");
            }
            // 添加随机数
            this.addRandomNumber();
            // 记录移动-合并-移动-添加后的数组 nextArray
            this.nextArray = JSON.parse(JSON.stringify(this.array));
            // 计数 + 1
            ++this.steps;
            // 更新分数
            this.calculateScores();
            // 追加记录
            this.record.push("Left");
            // 此时可以 undo, 更改 undoFlag 为 true
            this.undoFlag = true;
            // 使滚动条拉至当前 step
            this.$nextTick(() => {
                this.$refs.recordScroll.scrollTop =
                    this.$refs.recordScroll.scrollHeight;
            });
        },
        // 4.  mergeRight() 右 (向右合并)
        mergeRight() {
            // 记录合并前的数组 (JSON实现二维数组的深复制)
            this.lastArray = JSON.parse(JSON.stringify(this.array));
            // 如果数组中无空值且不能横向合并
            if (this.checkHorizontal()) {
                return alert("Game Over!");
            }
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
            // 合并后检查是否含有获胜数字
            if (this.array.flat().includes(this.winNumber)) {
                return alert("You Win!");
            }
            // 再次移动
            this.moveRight();
            // 在添加随机数之前
            // 如果数组中非空值个数 大于 this.size * this.size - this.newNumbers, 即数组中空值个数 小于 this.newNumbers
            // 无法继续添加随机数, 提示 "Game Over!"
            if (
                this.array.flat().filter(Boolean).length >
                this.size * this.size - this.newNumbers
            ) {
                return alert("Game Over!");
            }
            // 添加随机数
            this.addRandomNumber();
            // 记录移动-合并-移动-添加后的数组 nextArray
            this.nextArray = JSON.parse(JSON.stringify(this.array));
            // 计数 + 1
            ++this.steps;
            // 更新分数
            this.calculateScores();
            // 追加记录
            this.record.push("Right");
            // 此时可以 undo, 更改 undoFlag 为 true
            this.undoFlag = true;
            // 使滚动条拉至当前 step
            this.$nextTick(() => {
                this.$refs.recordScroll.scrollTop =
                    this.$refs.recordScroll.scrollHeight;
            });
        },
        /*****************************************************************/
        // play()
        play() {
            if (typeof this.base === "string") {
                this.base = Number(this.base);
            }
            console.log(typeof this.base);
            console.log(typeof this.size);
            // 如果用户在 input 输入框中更改了 initialFillableNumbers
            // 如果确实更改了, 其类型将为 string
            // 先转换为字符串数组 split(",")
            // 再转换为数字数组 map(Number)
            if (typeof this.initialFillableNumbers === "string") {
                this.initialFillableNumbers = this.initialFillableNumbers
                    .split(",")
                    .map(Number);
            }
            // 如果用户在 input 输入框中更改了 numberProbabilityArray
            if (typeof this.numberProbabilityArray === "string") {
                this.numberProbabilityArray = this.numberProbabilityArray
                    .split(",")
                    .map(Number);
            }
            // 如果用户在 input 输入框中更改了 winNumber
            if (typeof this.winNumber === "string") {
                this.winNumber = Number(this.winNumber);
            }
            // 重置
            this.reset();
        },
        // undo() 返回上一步(撤回)
        undo() {
            if (this.undoFlag) {
                // 回退到合并前的数组 (JSON实现二维数组的深复制)
                this.array = JSON.parse(JSON.stringify(this.lastArray));
                // 删除记录数组最后一个元素 pop()
                // 使用 lastElementInRecord 记录 record 中被删除的最后一个元素
                this.lastElementInRecord = this.record.pop();
            }
            // 还原 undoFlag 为默认的 false
            this.undoFlag = false;
            // 同时设置 redoFlag 为 true
            this.redoFlag = true;
            // 更新分数
            this.calculateScores();
        },
        redo() {
            if (this.redoFlag) {
                // 撤销回退
                this.array = JSON.parse(JSON.stringify(this.nextArray));
                // 重新添加被删除的最后一个元素
                this.record.push(this.lastElementInRecord);
            }
            // 还原 redoFlag 为默认的 false
            this.redoFlag = false;
            // 同时设置 undoFlag 为 true
            this.undoFlag = true;
            // 更新分数
            this.calculateScores();
        },
        exit() {
            // 所有元素置空
            this.array = Array.from({ length: this.size }, (item) =>
                Array.from({ length: this.size }).fill(null)
            );
            // 重置记录数组
            this.record = [];
            // 重置计数
            this.steps = 0;
            // 重置分数
            this.scores = 0;
        },
        // reset() 重置游戏
        reset() {
            this.array = Array.from({ length: this.size }, (item) =>
                Array.from({ length: this.size }).fill(null)
            );
            this.array = this.initializedArray();
            // 重置记录数组
            this.record = [];
            // 重置计数
            this.steps = 0;
            // 更新分数
            this.calculateScores();
        },
        // checkHorizontal() 检查横向是否可以合并
        // 当数组中无空值且横向无法合并时, 返回 true, 否则返回 false
        checkHorizontal() {
            // 数组中无空值
            if (this.array.flat().indexOf(null) === -1) {
                // 且横向无法合并, 即任意行中任意相邻元素均不等
                let trueOrFalse = this.array.every((row) => {
                    row.every((rowItem, rowIndex) => {
                        rowIndex === row.length - 1 ||
                            rowItem !== row[rowIndex + 1];
                    });
                });
                // 如果 trueOrFalse 为 true, 说明横向无法合并
                if (trueOrFalse) {
                    return true;
                }
            } else {
                return false;
            }
        },
        // checkVertical()
        // 当数组中无空值且纵向无法合并时, 返回 true, 否则返回 false
        checkVertical() {
            // 数组中无空值
            if (this.array.flat().indexOf(null) === -1) {
                // 数组转置为 tempArray
                let tempArray = this.transpose(this.array);
                // 数组纵向无法合并等价于数组转置后横向无法合并(横纵逆转)
                // 且数组转置后 tempArray 横向无法合并, 即任意行中任意相邻元素均不等
                let trueOrFalse = tempArray.every((row) => {
                    row.every((rowItem, rowIndex) => {
                        rowIndex === row.length - 1 ||
                            rowItem !== row[rowIndex + 1];
                    });
                });
                // 如果 trueOrFalse 为 true, 说明横向无法合并
                if (trueOrFalse) {
                    return true;
                }
            } else {
                return false;
            }
        },
    },
    setup() {
        let router = useRouter(); // router 全局路由对象
        let gotoGetStarted = () => {
            // 跳转路由
            router.push("/get-started");
        };
        let gotoAbout = () => {
            // 跳转路由
            router.push("/about");
        };
        let gotoQA = () => {
            // 跳转路由
            router.push("/question-and-answer");
        };
        return {
            gotoGetStarted,
            gotoAbout,
            gotoQA,
        };
    },
};
</script>

<style lang="scss" scoped>
// 字体
@font-face {
    font-family: GreatVibes;
    src: url(/src/assets/fonts/GreatVibes.otf);
}
// 定义每个格子的尺寸
$size: 40px;
// 定义边框颜色
$borderColor: #01cccc;
// 定义图标尺寸
$width-height: 32px;
.header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    & div {
        display: flex;
        justify-content: center;
        align-items: center;
        & img {
            width: $width-height;
            height: $width-height;
        }
        & button {
            // 高度同图标尺寸 $width-height
            height: $width-height;
            margin-left: 10px;
            font-family: Merriweather-Regular;
            cursor: pointer;
            // GitHub new issue 背景色 #2da44e 文本色 white
            border: 1px #2da44e solid;
            border-radius: 0.5rem;
            color: white;
            background: #2da44e;
        }
    }
    & .span-divider {
        width: 2px;
        background: #7057ff;
        margin: auto 20px auto;
    }
    & a {
        height: $width-height;
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
.setup {
    display: grid;
    // 行高
    grid-template-rows: repeat(7, 20px);
    // 列宽
    grid-template-columns: 1fr 100px;
    // 间隔
    grid-gap: 1rem;
    justify-items: center;
    align-items: center;
    & .play {
        display: flex;
        grid-column: span 2;
        & span {
            min-width: 55px;
        }
    }
    & input {
        width: 50px;
        font-family: Merriweather-Regular;
    }
}
.left {
    // 设固定宽度使 2048 布局水平居中
    width: 200px;
}
.right {
    width: 200px;
}
.record {
    display: flex;
    flex-direction: column;
    // 使布局居中
    width: 440px;
    height: 200px;
    overflow-y: auto;
    & div {
        width: 120px;
        background-color: #ff3c41;
        color: #fff;
        margin: 0 auto 10px;
        border-radius: 0.5rem;
    }
}
.steps-scores {
    display: grid;
    // 宽度随内容自适应
    width: fit-content;
    // grid 容器水平居中
    margin: 0 auto 20px;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 20px;
    // 子元素水平居中
    justify-items: center;
    // 子元素垂直居中
    align-items: center;
    & span {
        margin: 10px 0;
        // 最小宽度
        min-width: 32px;
        // 最大宽度
        max-width: 100px;
        // 取消鼠标样式
        cursor: default;
    }
}
.up {
    margin-bottom: 30px;
}
.down {
    margin-top: 30px;
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
    margin: 20px auto 20px;
    // 行高
    grid-template-rows: repeat(2, 50px);
    // 列宽
    grid-template-columns: repeat(4, 100px);
    // 子元素水平居中
    justify-items: center;
    // 子元素垂直居中
    align-items: center;
    // undo redo 宽度
    & .undo,
    & .redo,
    & .exit {
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
h2 {
    font-size: 2rem;
    width: 100px;
    margin-left: auto;
    margin-right: auto;
    background: linear-gradient(to right, #5d26c1, #a17fe0, #59c173);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
}
h3 {
    font-family: GreatVibes;
    font-size: 2rem;
}
/***********************************************/
// 整体思路: 先加上所有的边框, 再处理重叠的边框
// 1. 给每个数字所在位置加四周边框 (中间横竖边框线均重叠)
.column {
    // 宽高尺寸 $size
    width: $size;
    height: $size;
    border: 1px solid;
    color: #f9f6f2;
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

img {
    cursor: pointer;
}
span {
    // inline-block
    display: inline-block;
    text-align: center;
    margin-left: 10px;
    width: $width-height;
    height: $width-height;
    // line-height 同 height 即可垂直居中
    line-height: $width-height;
    // pornhub 背景色 #ff9900 文本色 white
    // GitHubgood first issue 背景色 #7057ff 文本色 white
    background-color: #7057ff;
    color: white;
    border-radius: 0.4rem;
    cursor: pointer;
}
// 定义数字显示样式 (如 2 4 8 16 32 64 128 256 512 1024 2048)
// https://github.com/gabrielecirulli/2048/blob/master/style/main.css#L331
.class1 {
    // background: #eee4da;
    background: #eee4da;
}
.class2 {
    background: #ede0c8;
}
.class3 {
    background: #f2b179;
}
.class4 {
    background: #f59563;
}
.class5 {
    background: #f67c5f;
}
.class6 {
    background: #f65e3b;
}
.class7 {
    background: #edcf72;
}
.class8 {
    background: #edcc61;
}
.class9 {
    background: #edc850;
}
.class10 {
    background: #edc53f;
}
.class11 {
    background: #edc22e;
}

// class12 ~ class20 暂定使用一个背景色
.class12 {
    background: #a6c;
}
.class13 {
    background: #93c;
}
.class14 {
    background: #3c3a32;
}
.class15 {
    background: #3c3a32;
}
.class16 {
    background: #3c3a32;
}
.class17 {
    background: #3c3a32;
}
.class18 {
    background: #3c3a32;
}
.class19 {
    background: #3c3a32;
}
.class20 {
    background: #3c3a32;
}
</style>
