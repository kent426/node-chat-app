const { Users } = require('./users') 
const expect = require('expect')


describe('Users class', () => {

    var users
    var samples

    beforeEach(()=> {
        users = new Users()
        samples = [{
            id:'1',
            name: 'u1',
            room: 'Node Room'
        },{
            id:'2',
            name: 'u2',
            room: 'React Room'
        },{
            id:'3',
            name: 'u3',
            room: 'Node Room'
        }]
        users.users = [].concat(samples)
    })

     
    describe('addUser', () => {
        it('should add a user to the Users', () => {
             var users = new Users()
            var newuser = {
                id:'dfdfdfdfvfg',
                name: 'whatsup',
                room: 'Group Room'
            }
            users.addUser(newuser.id,newuser.name,newuser.room)

            expect(users.users.length).toBe(1)
            expect(users.users[0].id).toBe(newuser.id)
            expect(users.users[0].name).toBe(newuser.name)
            expect(users.users[0].room).toBe(newuser.room)

        })
    })

    describe('getUserList', () => {
        it('should return the user names in Node Room', () => {
            names = users.getUserList('Node Room')
            expect(names).toEqual([users.users[0].name, users.users[2].name])
        })
    })

    describe('getUser', () => {
        it('should get the user', () => {
           u = users.getUser('1')
            expect(u).toEqual(users.users[0])
        })

        it('should not get the user if no id', () => {
            u = users.getUser('4')
             expect(u).toNotExist()
         })
    })

    describe('removeUser', () => {
        it('should remove the user', () => {
           u = users.removeUser('1')

            expect(u).toEqual(samples[0])
        })

        it('should not remove the user if no id', () => {
            u = users.removeUser('4')
             expect(u).toNotExist()
             expect(users.users).toEqual(samples)
         })
    })
})