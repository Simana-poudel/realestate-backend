const express  = require('express');
const {json, urlencoded} = express;
const app = express();
const port =3000;
const {connect} = require("./config/db")
const mainRouter = require('./routes/main')
connect()
// const server = http.createServer(app);
//server.listen(port);
//server.on('error',

app.use(json())
app.use(urlencoded({ extended: true }));


app.use('*',(req,res,next)=>{
    // console.log("REQ_body",req.body);
    // console.log("REQ_QUERY",req.query);
    // console.log("REQ_PARAMS",req.params);
    // console.log("REQ_HEADERS",req.headers);
    next();
})

// app.use('*',(req,res,next)=>{
    
//     next()
// })

app.use('/api',mainRouter)


app.use('*',(req,res,next)=>{
    res.json({error:"Api Cannot Be Found !!"}).status(404)
})

app.listen(port,()=>{
    console.log('listening on port',port)
})