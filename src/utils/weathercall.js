const request = require('request')
const weatherApiKey = require('./creds.js')

const API_ACCESS_KEY = weatherApiKey.WEATHER_STACK_API_KEY;

    // temperature:response.body.current.temperature,
    // weatherDescription:response.body.current.weather_descriptions[0],
    // precipitation:response.body.current.precip,
    // location:response.body.location.name
    
// Creating utility function for weatherstack api using callback function
const weatherCall = (latitude,longitude,callback)=>{
    // url for weatherstack api
    const weatherUrl = 'http://api.weatherstack.com/current?access_key='+ API_ACCESS_KEY +'&query=' + latitude + ', '+ longitude
    // find the weather information with given coordinates using callback and  object restructing
    request({url:weatherUrl,json:true},(error,{body}={})=>{
        if(error){
            callback('Unable to reach weatherstack. Please check your connectivity!',undefined)
        }else if(body.error){
            callback('Unable to fetch location. Please check your input parms and retry!',undefined)
        }else{
            callback(undefined,'Current weather is ' + body.current.temperature + ' degrees with '+ body.current.precip + '% chance for rain. Weather outside is currently '+body.current.weather_descriptions[0] + '. Thank you!')
        }
    })

}


module.exports=weatherCall