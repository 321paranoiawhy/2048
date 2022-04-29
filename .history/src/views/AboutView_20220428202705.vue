<template>
    <div class="about">
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
        <h1>This is an about page</h1>
    </div>
</template>

<style lang="scss" scoped>
div .about {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.QA {
    width: calc(50vw);
    margin: 30px auto;
}
</style>
