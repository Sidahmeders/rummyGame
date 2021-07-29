
module.exports = function corsConfig(req, res, next) {
    const origin = req.headers.origin
    res.header({
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    })
    next()
}