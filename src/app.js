const express=require('express')
// This express is a function ,Not a Object which we can use by express.()=>
//So we have to catch it into const like..
const app=express()
//This express() Function is used to create Sever.
// app.listen() is important function. As Compile starts from here Or we can imagine it as Server starts
// from here.
const path=require('path')

const geocode=require('./utilis/geocode')
const forecast=require('./utilis/forecast')
/*
Here It will works as,
app.com
app.com/help
app.com/about
app.com/weather
*/

/*
1)app.get() , This function has two arguments i.e. First is for URL for clients request Or
it can be for making localhost.
2)Second argu is function which has again two agru i.e. First is req that will handle
any request (req) which will used when any thing will come from outside, And
Second is res (response) which is to send back to browser Or other party the our 
things.

app.get('',(req,res)=>{                                 // For Main Page Or app.com
    res.send('Hello This Home Page of Expresss')
})

app.get('/help',(req,res)=>{                    // app.com/help
    res.send('This is Help page')
})

app.get('/about',(req,res)=>{                   // app.com/about
    res.send('About Page...')
})

app.set('view engine','hbs')
const publicDirectoryPath=path.join(__dirname,'../public')
console.log(publicDirectoryPath)
app.use(express.static(publicDirectoryPath))


*/

const hbs=require('hbs')

 // Path for views and static
const publicDirectoryPath = path.join(__dirname, '../public')
console.log(__dirname)
const viewsPath= path.join(__dirname,'/templates/views')
const partialPath= path.join(__dirname,'/templates/partial')

// Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath) 

// Setup static directory to server
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialPath)

app.get('', (req, res) => {
    res.render('index',{
        title:'Weather App',
        name:'Rohit dada Pawar'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Rohit dada Pawar'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page ',
        helptext:'This is Help Text '
    })
})

app.get('/weather',(req,res)=>{                 // app.com/weather

    if(!req.query.address)
    {
        return res.send({
            error:"You must Send Place name to search "
        })
    }

    //starts from here.

    geocode(req.query.address, (error, {latitude,longitude,location}={}) => {
        console.log('Error', error)
        console.log('Data', geocode)
        forecast(latitude,longitude,(error,forecast)=>{
            //console.log('Error', error)
            //console.log('Data', data)
            if(error){
               return  res.send({
                    error,
                })


                //console.log(error)
            }
            else{
                res.send({
                    forecast,
                    location,
                    address:req.query.address
                })
                //console.log(forecast)
                //console.log(location)
            }
        })
    })

    console.log("End OF program")
})


app.get('/help/*',(req,res)=>{

    res.render('404',{
        title:'404',
        name:'Rohit dada Pawar',
        errorMesseage:'Help Article Not Found '
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Rohit dada Pawar',
        errorMesseage:  'Page Not Found'
    })
})

app.listen(3000, ()=>{      //First argument is port and second argument is function as it will excueted .
    console.log('This is Console of port:3000') //The console inside listen will not show this on browser ot client request ,
    //it is for us or for terminal to show. 
}) 