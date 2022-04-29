<template>
    <div class="back">
        <div>
            <img src="../assets/images/IcBaselineArrowBackIos.svg" alt="" />
            <span>Back to Home</span>
        </div>
        <div>
            <span>Forward to About</span>
            <img src="../assets/images/IcBaselineArrowForwardIos.svg" alt="" />
        </div>
    </div>
    <h1>Get Started</h1>
</template>

<style lang="scss">
$width-height: 32px;
div .back {
    display: flex;
    justify-content: center;
    align-items: center;
    & div {
        vertical-align: middle;
    }
}
</style>
