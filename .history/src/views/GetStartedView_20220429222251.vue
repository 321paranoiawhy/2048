<template>
    <div class="container">
        <div class="back-forward">
            <div>
                <img src="../assets/images/IcBaselineArrowBackIos.svg" alt="" />
                <span>Back to Home</span>
            </div>
            <div>
                <span>Forward to About</span>
                <img
                    src="../assets/images/IcBaselineArrowForwardIos.svg"
                    alt=""
                />
            </div>
        </div>
        <h1>Get Started</h1>
        <h2>How to play ?</h2>
        <h3>
            Just press the arrow key on the keyboard, or instead you can press
            W, A, S, D.
        </h3>
    </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
    setup() {
        let router = useRouter(); // router 全局路由对象
        let gotoHome = () => {
            // 跳转路由
            router.push("/HomeView");
        };
        return {
            gotoHome,
        };
    },
};
</script>

<style lang="scss" scoped>
$width-height: 32px;
div .container {
    width: calc(50vw);
    margin: 30px auto;
}
div .back-forward {
    display: flex;
    justify-content: space-between;
    align-items: center;
    & div {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
}
</style>
