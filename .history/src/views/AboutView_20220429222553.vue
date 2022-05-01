<template>
    <div class="container">
        <div class="back-forward">
            <div>
                <img src="../assets/images/IcBaselineArrowBackIos.svg" alt="" />
                <span>Back to Get Started</span>
            </div>
            <div>
                <span>Forward to Q & A</span>
                <img
                    src="../assets/images/IcBaselineArrowForwardIos.svg"
                    alt=""
                />
            </div>
        </div>
        <h1>This is an about page.</h1>
    </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
    setup() {
        let router = useRouter(); // router 全局路由对象
        let gotoHome = () => {
            // 跳转路由
            router.push("/home");
        };
        let gotoAbout = () => {
            // 跳转路由
            router.push("/about");
        };
        return {
            gotoHome,
            gotoAbout,
        };
    },
};
</script>

<style lang="scss" scoped>
div .back-forward {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(50vw);
    margin: 30px auto;
    & div {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
