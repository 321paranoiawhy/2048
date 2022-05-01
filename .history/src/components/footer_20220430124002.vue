<template>
    <footer>
        <div class="down-animation">
            <!-- 雪佛兰 https://www.chevron.com/ -->
            <div class="chevron"></div>
            <div class="chevron"></div>
            <div class="chevron"></div>
        </div>
        <!-- https://www.rapidtables.com/web/html/html-codes/html-code-copyright.html -->
        <!-- &copy; -->
        <!-- &#9400; -->
        <p>Copyright &copy; 2022 paranoiawhy</p>
        <p>Powerd by <a>Vue 3 & VS Code & Netlify.</a></p>
        <p>
            If you have any questions or find any issues, please feel free to
            contact in the following ways:
        </p>
        <ul>
            <li>
                <img src="../assets/images/CodiconIssues.svg" alt="" />
                <a
                    href="https://github.com/321paranoiawhy/2048/issues"
                    target="_blank"
                    >GitHub Issues
                </a>
            </li>
            <li>
                <img src="../assets/images/MdiSourcePull.svg" alt="" />
                <a
                    href="https://github.com/321paranoiawhy/2048/pulls"
                    target="_blank"
                    >GitHub Pull requests
                </a>
            </li>
            <li>
                <img src="../assets/images/LogosGoogleGmail.svg" alt="" />
                <a href="mailto:paranoiawhy@gmail.com">Gmail</a>
            </li>
        </ul>
    </footer>
</template>

<script>
export default {
    name: "Footer",
};
</script>

<style lang="scss">
// 定义图标尺寸
$width-height: 32px;
// 文字波浪下划线 https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-decoration
footer a {
    text-decoration: green wavy underline;
    color: #2c3e45;
}
footer {
    position: absolute;
    width: 100%;
    margin-top: 60px;
    & img {
        margin-right: 15px;
        width: 20px;
        height: 20px;
    }
    & ul {
        width: fit-content;
        margin-left: auto;
        margin-right: auto;
        & li {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 10px;
        }
    }
}

.down-animation {
    position: relative;
    width: 24px;
    height: 24px;
    margin: 0 auto 100px;
}

.chevron {
    position: absolute;
    width: 28px;
    height: 8px;
    opacity: 0;
    transform: scale3d(0.5, 0.5, 0.5);
    animation: move 3s ease-out infinite;
}

.chevron:first-child {
    animation: move 3s ease-out 1s infinite;
}

.chevron:nth-child(2) {
    animation: move 3s ease-out 2s infinite;
}

.chevron:before,
.chevron:after {
    content: " ";
    position: absolute;
    top: 0;
    height: 100%;
    width: 51%;
    background: #7057ff;
}

.chevron:before {
    left: 0;
    transform: skew(0deg, 30deg);
}

.chevron:after {
    right: 0;
    width: 50%;
    transform: skew(0deg, -30deg);
}

@keyframes move {
    25% {
        opacity: 1;
    }
    33% {
        opacity: 1;
        transform: translateY(30px);
    }
    67% {
        opacity: 1;
        transform: translateY(40px);
    }
    100% {
        opacity: 0;
        transform: translateY(55px) scale3d(0.5, 0.5, 0.5);
    }
}
</style>
