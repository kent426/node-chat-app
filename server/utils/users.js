// [{
//     id:'dfdfdfdf',
//     name: 'kent',
//     room: 'Friends'
// }]


//addUser(id, name, room)
//removeUser(id)
//getUser(id)
//getUserList(room)

class Users {
    constructor() {
        this.users = []
    }

    addUser(id,name,room) {
        var newUser = {id,name,room}
        this.users.push(newUser)
        return newUser
    }

    removeUser(id) {
        var RemovedIndex = this.users.findIndex((user) => user.id === id)
        if(RemovedIndex > -1) {
            var removedUser = this.users.splice(RemovedIndex,1)
            return removedUser[0]
        }
        return null
        // this.users = this.users.filter((user) => user.id !== id )
    }

    getUser(id) {
        var found = this.users.find((user) => {
            return user.id === id
        })

        return found ? found : null 
    }

    getUserList(room) {
        var roomUsers = this.users.filter((user) => user.room ===room )
        var namesArr = roomUsers.map((user) => user.name)
        return namesArr
    }
}

module.exports = { Users }




// class User {
//     constructor(id, name, room) {
//         this.id = id
//         this.name = name
//         this.room = room
//     }

//     addUser(id, name, room) {

//     }
// }