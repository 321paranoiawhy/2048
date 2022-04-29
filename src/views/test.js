function test(n) {
    if (n > 10) {
        { return "test" };
    }
    if (n > 100) {
        return "HHHH"
    }
}
console.log(test(1000));