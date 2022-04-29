<template>
    <div class="QA">
        <div class="back">
            <img src="../assets/images/IcBaselineArrowBackIos.svg" alt="" />
            <span>Back to About</span>
        </div>
        <h2>Q 1 : Can I undo the previous action ?</h2>
        <h3>
            A 1 : Of course you can but only one action can be undone. So just
            be cautious and have fun.
        </h3>
        <h2>Q 2 : Can I share the game result to social media ?</h2>
        <h3>
            A 2 : Yes you can share it to social media once you have already
            logged in. For examples, QQ, WeChat, Twitter, Facebook and others
            are provided for your convenience.
        </h3>
        <h2>Q 3 : Are there ads in this website ?</h2>
        <h3>
            A 3 : No, we will never show ads in this website. All of you can
            enjoy free the website without ads bothering.
        </h3>
        <h2>Q 4 : Is there anything I can help with ?</h2>
        <h3>
            A 4 : Certainly, we are always open to any suggestions and feedback.
            Even you can get involved and build together. GitHub Source Code :
            <a href="">https://github.com/321paranoiawhy/2048-Vue</a>
        </h3>
    </div>
</template>

<style lang="scss" scoped>
.QA {
    width: calc(50vw);
    margin: 30px auto;
    & h3 a {
    }
}
.back {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
}
h2::first-letter {
    color: blue;
    font-size: 2.5rem;
}
</style>
