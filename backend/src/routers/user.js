const express = require('express');
const router = new express.Router();
//const sharp = require('sharp');
const User = require('../models/user');

const auth = require('../middleware/auth');
const error = require('../middleware/error');
// const multer = require('multer')

/*const upload = multer({
 limits: {
 fileSize: 1000000
 },
 fileFilter(req, file, cb) {
 if(!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
 return cb(new Error('Please upload a picture'))
 }
 cb(undefined, true)
 }
 })*/

router.post('/users', async (req, res) => {
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
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);

        const token = await user.generateAuthToken();

        res.send({user, token})
    } catch (e) {
        console.log(e);
        res.status(400).send()
    }
});

router.post(`/logout`, auth, async (req, res) => {

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
});

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
});

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)

});
/*
 router.get('/users/:id', async (req, res)=> {
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
 })

 */
router.patch('/users/me', auth, async (req, res) => {
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
})
/*
 router.delete('/users/:id', async(req, res) => {
 try {
 const user = await User.findByIdAndDelete(req.params.id)

 if(!user) {
 return res.status(404).send()
 }
 res.send(user)

 } catch(e) {
 res.status(500).send(e)
 }
 })
 */

router.delete('/users/me', auth, async (req, res) => {
    try {
//const user = await User.findByIdAndDelete(req.user._id)

//if(!user) {
        //  return res.status(404).send()
//}

        await req.user.remove()
        res.send(req.user)

    } catch (e) {
        res.status(500).send(e)
    }
})
/*

 router.post('/users/me/avatar', auth, upload.single('avatar'), async(req, res) => {
 const buffer = await WaveShaperNode(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer()

 req.user.avatar = buffer
 await req.user.save()
 res.send()
 }, (error, req, res, next) => {
 res.status(400).send({error: error.message})
 })
 */

router.delete('/users/me/avatar', auth, async (req, res) => {

    req.user.avatar = undefined
    await req.user.save()
    res.send()

}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)

    } catch (e) {
        res.status(404).send()
    }
});


module.exports = router;
