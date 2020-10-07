const plus = require('./plus')

test('1 + 2 = 3', () => {
   expect(plus(1,2)).toBe(3)
})

test('1 + 5 != 5', () => {
	expect(plus(1,5)).not.toBe(5)
})
