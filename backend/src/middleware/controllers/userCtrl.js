const User = require('../../models/user');

module.exports = {
    updateUser,
    addUser,
    login,
    logout,
    logoutAll,
    getUser,
    getUserById,
    deleteUser,
    deleteMe
};

async function updateUser(req, res) {

        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'email', 'password', 'age']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

        if (!isValidOperation) {
            return res.status(400).send({error: 'Invalid operation'})
        }
        try {
            //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
            //const user = await User.findById(req.user._id)

            updates.forEach(update => {
                req.user[update] = req.body[update]
            })

            await req.user.save()
            res.send(req.user)
            /* if(!user) {
             return res.status(404).send()
             }
             */


        } catch (e) {
            res.status(400).send(e)
        }
    }


async function addUser(req, res) {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        // console.log('token', token)
        res.status(201).send({user, token})
    } catch (e) {
        if (e.code === 11000) {
            //  return res.status(400).send({error: 'E-mail already exists!'})
        }
        res.status(400).send(e)
    }
}


async function login(req, res) {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);

        const token = await user.generateAuthToken();

        res.send({user, token})
    } catch (e) {
        console.log(e);
        res.status(400).send()
    }
}

async function logout(req, res) {

    const token1 = req.header('Authorization').replace('Bearer ', '')

    try {
        req.user.tokens = req.user.tokens.filter((token) => {

            return token.token !== token1
        })
        await req.user.save();

        res.status(200).send();
    } catch (e) {
        res.status(500).send();
    }
}

 async function logoutAll(req, res) {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
}

async function getUser(req, res) {
    res.send(req.user)

}

async function getUserById(req, res) {
    const _id = req.params.id;
    console.log(req.params)

    try {
        const user = await User.findById(_id)
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch(e) {
        res.status(500).send()
    }
}

async function deleteUser(req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if(!user) {
            return res.status(404).send()
        }
        res.send(user)

    } catch(e) {
        res.status(500).send(e)
    }
}

async function deleteMe (req, res) {
    try {
        await req.user.remove()
        res.send(req.user)

    } catch (e) {
        res.status(500).send(e)
    }
}
