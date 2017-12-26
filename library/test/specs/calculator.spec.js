const Calculator = require('../../src/calculator')

const expect = require('chai').expect

const calculator = new Calculator()

describe('计算器的测试', () => {
    it('1 + 1 应该等于2', () => {
        expect(calculator.add(1, 1)).to.be.equal(2)
    })
})
