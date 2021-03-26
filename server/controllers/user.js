const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db')
        const { username, password } = req.body
        try {
            const [ existingUser ] = await db.user.find_user_by_username(username)

            if(existingUser) {
                return res.status(409).send('Username already exists')
            }
            
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)

            const [ newUSer ] = await db.user.create_user(username, hash, `https://robohash.org/${username}.png`)

            req.session.user = newUSer

            // Not sure if I need to send newUser back
            res.status(200).send(newUSer)
        } catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },

    login: async (req, res) => {

        const db = req.app.get('db')
        const { username, password } = req.body
            const [ existingUser ] = await db.user.find_user_by_username(username)
            if (!existingUser) {
                return res.status(401).send('Incorrect username')
            }
            
            const isAuthenticated = bcrypt.compareSync(password, existingUser.password)

            if (!isAuthenticated) {
                return res.status(401).send('Incorrect password')
            }

            req.session.user = existingUser
            res.status(200).send(req.session.user)
            // console.log because Im curious 
            console.log(req.session.user)
    },

    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },

    // not sure if this is the corrrect way to see if user is logged in
    getUser: (req, res) => {
        if (req.session) {
            return res.status(200).send(req.session.user)
        } else {
            return res.sendStatus(404)
        }
    }
}