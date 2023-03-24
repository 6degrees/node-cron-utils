
var assert = require('assert');
const utils = require('../main');

const hi = new utils();


test('testing * * * * * *', ()=>{
    expect(hi.double("* * * * * *")).toBe("*/2 * * * * *")
})

test('testing */10 * * * * *', ()=>{
    expect(hi.double("*/10 * * * * *")).toBe("*/20 * * * * *")
})

test('testing * */1 * * * *', ()=>{
    expect(hi.double("* */1 * * * *")).toBe("* */2 * * * *") // not sure if it is correct
})

test('testing */20 * * * * *', ()=>{
    expect(hi.double("*/20 * * * * *")).toBe("*/40 * * * * *")
})

test('testing */40 * * * * *', ()=>{
    expect(hi.double("*/40 * * * * *")).toBe("20 */1 * * * *")
})

test('testing 20 */1 * * * *', ()=>{
    expect(hi.double("20 */1 * * * *")).toBe("40 */2 * * * *")
})

test('testing 40 */1 * * * *', ()=>{
    expect(hi.double("40 */1 * * * *")).toBe("20 */3 * * * *")
})

test('testing 40 */40 * * * *', ()=>{
    expect(hi.double("40 */40 * * * *")).toBe("20 */21 * * * *") // Not sure if this is correct
})

test('testing */5 * * * *', ()=>{
    expect(hi.double("*/5 * * * *")).toBe("* */10 * * * *") // Not sure if this is correct
})