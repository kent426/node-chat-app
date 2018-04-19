var expect = require('expect')

var { generateMessage } = require('./message')


describe('generateMesssage', () => {
    it('should generate the correct message object', () => {
        var from = 'from text'
        var text = 'this is the text'
        var message = generateMessage(from,text)
        expect(message.from).toBe(from)
        expect(message.text).toBe(text)
        expect(typeof message.createdAt).toBe('number')
    })
})