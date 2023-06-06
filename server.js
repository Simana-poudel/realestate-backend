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
    console.log("New Request")
    console.log("REQ_body",req.body);
    // console.log("REQ_HEADERS",req.headers);
    console.log("REQ_QUERY",req.query);
    console.log("REQ_PARAMS",req.params);
    next();
})

app.use('/api',mainRouter)

app.listen(port,()=>{
    console.log('listening on port',port)
})