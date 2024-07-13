const { getAllUsers } = require('../services/userService.js')
const { getUserById } = require('../services/userService.js')
const { createUser } = require('../services/userService.js')
const { deleteUser } = require('../services/userService.js')

module.exports = () => {
    getAllUsers: async (req, res) => {
        try{
            const users = await getAllUsers()
            //res.json(users)
            res.send('User route')
        }
        catch(e){
            res.status(500).send('e')
        }
    }

    getUserById: async (req, res) => {
        try{
            const userId = req.params.userId
            const user = await getUserById(userId)
            res.json(user)
        }
        catch(e){
            res.status(500).send(e)
        }
    }   
}