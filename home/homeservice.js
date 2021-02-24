const iplocate = require("node-iplocate")
const publicIp = require('public-ip')
const request = require('request')
const Mailer = require('./mail.js')
const fs = require('fs')
const path = require('path')
var db
let MongoClient = require('mongodb').MongoClient

const dburl = "mongodb://localhost:27017/MediaApp" 
MongoClient.connect(dburl, { useUnifiedTopology: true, useNewUrlParser: true }, (err,client)=>{
    if(err){
        console.log("Error in connecting to database" , err)
    }
    else{
        console.log("Connected to Database...")
        db = client.db('MediaApp')
        
        
    }
})


exports.location = ()=>{
    return new Promise((resolve,reject)=>{
        publicIp.v4().then(ip => {
            iplocate(ip).then(function(results) {
                var city = results.city
                // console.log(city)
                resolve({name :city})
        })
        }).catch(err=>[
            res.status(500).send('Error finding Location')
        ])
    })
}

exports.getweather = (city)=>{
    // Setting URL and headers for request
    const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${process.env['WeatherAPI']}`
    var options = {
        url: weatherUrl,
        headers: {'User-Agent': 'request'}
    };
    return new Promise(function(resolve, reject) {
        request.get(options, function(err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        })
    })
}

exports.getimages = ()=>{
    var images = []
    let imagefolder = path.join(__dirname, '../public/images')
    return new Promise(function(resolve, reject) {
        fs.readdir(imagefolder, (err, files) => { 
            if (err) 
            console.log(err); 
            else { 
            //   console.log("\nCurrent directory filenames:") 
            files.forEach( async file => { 
                await images.push(file)
                // console.log(file)
            })
            resolve(images) 
            } 
        })
    })
}

exports.getlatestnews = ()=>{
    return new Promise(function(resolve, reject) {
        var mysort = { date: -1 }
        db.collection("news").find().sort(mysort).limit(3).toArray(function(err, result) {
            if (err) reject(err)
            resolve(result)
        });
    })
}

exports.sendMail = (email,message)=>{
    mailresult =Mailer.sendMail(email,message)
}

exports.getsportsnews = ()=>{
    const sportsurl = `http://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=${process.env['SportsAPI']}`
    var options = {
        url: sportsurl,
        headers: {'User-Agent': 'request'}
    };
    return new Promise(function(resolve, reject) {
        request.get(options, function(err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        })
    })
}