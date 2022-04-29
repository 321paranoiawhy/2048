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
