const express = require('express');
const router = new express.Router();

const toJson  = require('unsplash-js');

const fetch = require('node-fetch');
const Unsplash = require('unsplash-js').default;
const unsplash = new Unsplash({
    accessKey: 'nEXCTXH_UErmcDXKJmUVwQiOXLKlJZRfAnWRwdQfdXs',
    secret: 'BVMILs0iFb5ImUKEqDvwxATfCwYzaqUnFIPPjrkOfXY',
    callbackUrl: 'http://localhost:3000/photos'});

global.fetch = fetch;



router.get('/photos', async(req, res) => {
    try {

        await fetch(`https://source.unsplash.com/1600x900/?mountains`).then((response)=> {
            console.log(response)

            res.send(response.url)
        })

            /* await fetch('https://unsplash.com/oauth/authorize', {
                 client_id:'nEXCTXH_UErmcDXKJmUVwQiOXLKlJZRfAnWRwdQfdXs'
             }).then(response => {
                 console.log(response)
                 res.send(response)
                /!* response.json()
                 .then(data => {
                     res.send(data)
                     console.log(data)
                 })*!/
             });*/
/*

        const authenticationUrl = unsplash.auth.getAuthenticationUrl([
            "public",
            "read_user",
            "write_user",
            "read_photos",
            "write_photos"
        ]);
        console.log(authenticationUrl);

        location.assign(authenticationUrl);

        unsplash.auth.userAuthentication(query.code)
            .then(toJson)
            .then(json => {
                unsplash.auth.setBearerToken(json.access_token);
            });
        unsplash.photos.getRandomPhoto({ username: 'aliche2020' })
            .then(toJson)
            .then(json => {
                console.log(json)
                // Your code
                res.send(json)
            });
*/

    } catch(e) {
        res.status(404).send()
    }

     /*
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)

    }catch(e) {
        res.status(404).send()
    }*/
});

module.exports = router;
