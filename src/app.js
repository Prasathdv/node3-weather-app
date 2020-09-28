// import path nodejs core module
const path = require('path')
// import request module
const request = require('request')
// Web server creation using express module
const express = require('express')
// import hbs(handlebars) to explore partials function
const hbs = require('hbs')
// import geocode module
const geoCodeTranslate = require('./utils/geocodetranslate.js')
// import weather module
const weatherCall = require('./utils/weathercall.js')


// Start the web server
const app = express()

// Set up Heroku`s port or localhost port
const port = process.env.PORT || 3000

// Define paths for express configuration
const homePagePath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(homePagePath))

// Home Page
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        author:'Andrew Mead',
        context: 'This app display weather information for given location',
        name: 'Prasath DV'
    })
})
// About page
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Page',
        context:'This site is created by Prasath DV under guidance by Andrew Mead (Udemy). This site uses mapbox.com and weatherstack.com API`s to extract required weather information.',
        name: 'Prasath DV',
        author:'Andrew Mead'
    })
})
// Help page
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        context:'Refer below repos for this page creation',
        name: 'Prasath DV',
        author:'Andrew Mead'
    })
})
// Weather page
app.get('/weather',(req,res)=>{
    // address is a query string added in the url request. req.query field will store the query string.
    const address = req.query.address
    if(!address){
        return res.send(
            {error:'Please enter required address for search'}
            )
    }else{
        geoCodeTranslate(address,(error,{latitude,longitude,location}={})=>{
            if(error){
                return res.send({error:error})
            }
            weatherCall(latitude,longitude,(error,weatherData)=>{
                if(error){
                    return res.send({error:error});
                }
                return res.send({
                    address:address,
                    location:location,
                    result:weatherData
                })

            })

        })

    }
                

})
// help 404 page
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'Article section 404!',
        message:'Your article in search gone outside for a small walk!.. come back later to meet. You are welcome!',
        name:'Prasath DV',
        author:'Andrew Mead'
    })
})

// 404 page
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404 ! Run !!!',
        message:'Error 404 | Page not found | Come back when it returns!',
        name:'Prasath DV',
        author:'Andrew Mead'
    })
})

// Listening webserver in dev port 3000
app.listen(port,()=>{
    console.log('Server is now up on '+ port);
})