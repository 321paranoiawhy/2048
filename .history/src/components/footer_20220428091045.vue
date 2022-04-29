<template>
    <!-- https://www.rapidtables.com/web/html/html-codes/html-code-copyright.html -->
    <!-- &copy; -->
    <!-- &#9400; -->
    <footer>
        <p>&#9400; 2022</p>

        <p>Powerd by <a>Vue 3 & VS Code.</a></p>
        <p>Author: <a>paranoiawhy.</a></p>
        <p>
            If you have any questions or find any issues, please feel free to
            caontact me.
        </p>
        <ul>
            <li>GitHub Issues:</li>
            <li></li>
        </ul>
    </footer>
</template>

<script>
export default {
    name: "Footer",
};
</script>

<style lang="scss">
// 文字波浪下划线 https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-decoration
footer a {
    text-decoration: green wavy underline;
}
</style>
