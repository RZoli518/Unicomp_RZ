const { getAllUsers } = require('./userService.js')
const { getUserById } = require('./userService.js')
const { createUser } = require('./userService.js')
const { deleteUser } = require('./userService.js')

module.exports = () => {
    getAllUsers: async (req, res) => {
        try{
            const users = await getAllUsers()
            req.json(users)
        }
        catch(e){
            res.status(500).send(e)
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