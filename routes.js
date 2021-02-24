let Express = require('express')
let router = Express.Router()  
let HomeRoutes = require('./home')


router.use('/', HomeRoutes)


module.exports = router 