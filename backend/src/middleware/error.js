const error = (req, res, next) => {
    throw new Error('From my middleware')
}

module.exports = error