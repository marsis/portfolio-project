const express = require('express');
const router = new express.Router();
//const sharp = require('sharp');

const auth = require('../middleware/auth');
const error = require('../middleware/error');

const User = require('../middleware/controllers/userCtrl');

router.post('/api/users', User.addUser)

router.post('/api/login', User.login)

router.post(`/api/logout`, auth, User.logout)

router.post('/api/users/logoutAll', auth, User.logoutAll)

router.get('/api/users/me', auth, User.getUser)

router.get('/api/users/:id', User.getUserById)

router.patch('/api/users/me', auth, User.updateUser);

router.delete('/api/users/:id', User.deleteUser);

router.delete('/api/users/me', auth, User.deleteMe)

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

/*
router.delete('/users/me/avatar', auth, async (req, res) => {

    req.user.avatar = undefined
    await req.user.save()
    res.send()

}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})
*/

/*router.get('/users/:id/avatar', async (req, res) => {
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
});*/


module.exports = router;
