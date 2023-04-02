
var assert = require('assert');
const utils = require('../lib/cjs/index');

function useit(expression){
    const myUtils = new utils(expression);
    myUtils.double();
    return myUtils.newExpression;
}

test('testing * * * * * *', ()=>{
    expect(useit("* * * * * *")).toBe("*/2 * * * * *")
})

test('testing */10 * * * * *', ()=>{
    expect(useit("*/10 * * * * *")).toBe("*/20 * * * * *")
})

test('testing * */1 * * * *', ()=>{
    expect(test("* */1 * * * *")).toBe("* */2 * * * *") // not sure if it is correct
})

test('testing */20 * * * * *', ()=>{
    expect(useit("*/20 * * * * *")).toBe("*/40 * * * * *")
})

test('testing */40 * * * * *', ()=>{
    expect(useit("*/40 * * * * *")).toBe("20 */1 * * * *")
})

test('testing 20 */1 * * * *', ()=>{
    expect(useit("20 */1 * * * *")).toBe("40 */2 * * * *")
})

test('testing 40 */1 * * * *', ()=>{
    expect(useit("40 */1 * * * *")).toBe("20 */3 * * * *")
})

test('testing 40 */40 * * * *', ()=>{
    expect(useit("40 */40 * * * *")).toBe("20 */21 * * * *") // Not sure if this is correct
})

test('testing */5 * * * *', ()=>{
    expect(useit("*/5 * * * *")).toBe("* */10 * * * *") // Not sure if this is correct
})
