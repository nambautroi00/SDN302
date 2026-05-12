const solveLinearEquation = require('./solveLinearEquation');
const solveQuadraticEquation = require('./solveQuadraticEquation');
(async () => {
    try {
        const a = 1, b = -5, c = 6, d = 0, e = 3;
        console.log(`The Solution of the linear equation is: `, await solveLinearEquation(d, e));
        console.log(`The Solution of the quadratic equation is: `, await solveQuadraticEquation(a, b, c));
    } catch (error) {
        console.error(error);
    }
})();