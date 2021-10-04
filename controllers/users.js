const bcrypt = require('bcrypt'); 
const usersRouter = require('express').Router() 
const User = require('../models/user')

usersRouter.get('/test', async(request, response)=>{
    response.send('response from api/users/test');
})

usersRouter.get('/', (request, response) => {
    User.find({}).then(users => {
      response.json(users)
    })
})

usersRouter.post ('/', async (request, response) => {
    const body = request.body; 
    if (body.password.length < 4) {
        return response.status(400).send({
            error: 'password must be at least 4 chars long'
        })
    }
    const passwordHash = await bcrypt.hash(body.password, 10); 

    const user = new User ({
        username: body.username, name: body.name, passwordHash
    })

    const savedUser = await user.save(); 
    response.json(savedUser);
})

module.exports = usersRouter; 