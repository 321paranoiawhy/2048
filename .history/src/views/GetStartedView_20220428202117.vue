<template>
    <div class="container">
        <div class="back">
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
div {
    width: calc(50vw);
    text-align: center;
}
div .back {
    display: flex;
    justify-content: space-between;
    align-items: center;
    & div {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    &:first-child {
        margin-left: 100px;
    }
    & :last-child {
        margin-right: 100px;
    }
}
</style>
