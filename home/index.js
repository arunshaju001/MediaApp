let Express = require('express')
let router  = Express.Router()
let HomeService = require('./homeservice')

// let AuthController = require('../auth/auth.controller.js')



router.get('/',(req,res)=>{
    HomeService.location().then(city=>{
        HomeService.getweather(city).then( weather=>{
            weather=JSON.parse(weather)
            HomeService.getimages().then(images=>{
                HomeService.getlatestnews().then(news=>{
                    res.render('home',{weather,images,news})
                })
            })
        })
        
    },error =>{
        res.status(500).send('Error')
    })
})

router.get('/sports',(req,res)=>{
    HomeService.getsportsnews().then( sportsdata=>{
        sports = JSON.parse(sportsdata)
        res.render('sports',{sports})
    })
    
})

router.get('/about',(req,res)=>{
    res.render('about')
})

router.get('/contact',(req,res)=>{
    res.render('contact')
})

router.post('/send',(req,res)=>{
    HomeService.sendMail(req.body.email,req.body.message)
    res.render('contact')
})



module.exports = router