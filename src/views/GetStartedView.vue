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
    </div>
</template>

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
    }
}
</style>
