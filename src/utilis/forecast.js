const request = require('request')


const forecast=(lat,long,callback)=>{
   
    const url='https://api.darksky.net/forecast/416a6e62a124804e629dc8f761d79f2c/'+encodeURIComponent(lat)+','+encodeURIComponent(long)+'?units=si'
    //1)After Lat and Long , We put additional key as units i.e. its it will return us value in SI Unit.
    request({ url, json:true}, (error, {body}) => {
        //const data = JSON.parse(response.body)
    
    if(error)
    { callback('Unable To Connect...Check your Inernet Connection.',undefined)}    
    else if(body.error)
    { callback('Unable to get City...As City in URL is incorrect.',undefined)}
    else{
    // Below Lines explain us How to access Parse formatt of weather api     
    callback(undefined,body.daily.data[0].summary+' Currently Temperature is: '+body.currently.temperature+' Degrees Celisus With Proablity of  '+body.currently.precipProability)
       
    }
    })
}

module.exports=  forecast