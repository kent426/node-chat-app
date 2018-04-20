const expect = require('expect')

const {isRealString} = require('./isRealString')


describe('isRealString func', () => {
    it('should reject non-string values', () => {
        var res = isRealString(98)
        expect(res).toBe(false)
    })

    it('should reject only spaces values', () => {
        var res = isRealString('            ')
        expect(res).toBe(false)
    })

    it('should accept valid string values', () => {
        var res = isRealString('     eee       ')
        expect(res).toBe(true)
    })

})