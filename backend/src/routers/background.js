const express = require('express');
const router = new express.Router();

const toJson  = require('unsplash-js');

const fetch = require('node-fetch');
const Vibrant = require('node-vibrant');

const Unsplash = require('unsplash-js').default;
const unsplash = new Unsplash({
    accessKey: 'nEXCTXH_UErmcDXKJmUVwQiOXLKlJZRfAnWRwdQfdXs',
    secret: 'BVMILs0iFb5ImUKEqDvwxATfCwYzaqUnFIPPjrkOfXY',
    callbackUrl: 'http://localhost:3000/photos'});

global.fetch = fetch;



router.get('/api/background', async(req, res) => {
    let imageUrl;
    try {

        await fetch(`https://source.unsplash.com/1600x900/?mountains`).then((response)=> imageUrl = response.url)
            .catch(e => res.status(404).send({body: {message: "Page not found-1"}, error: e}))

        await Vibrant.from(imageUrl).getPalette((err, swatches) => {
            const swatchesHex = {}
            for (const swatch in swatches) {
                if (swatches.hasOwnProperty(swatch) && swatches[swatch]) {
                    swatchesHex[swatch] = swatches[swatch].getHex()
                }
            }
            res.send({
                imageUrl,
                palette: {
                    mainColors: swatchesHex,
                    titleTextColor: swatches.Vibrant.titleTextColor,
                    bodyTextColor: swatches.Vibrant.bodyTextColor
                }
            })
        }).catch(e => res.status(404).send({body: {message: "Page not found -2"}, error: e}))
    } catch(e) {
        res.status(404).send({body: {message: "Page not found"}})
    }

});


module.exports = router;
