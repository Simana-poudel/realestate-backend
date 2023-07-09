const express  = require('express');
const {json, urlencoded} = express;
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const {connect} = require("./config/db")


// dotenv configure
dotenv.config({
    path: "./config/.env",
  });
  
  //routes declaration
const mainRouter = require('./routes/main')
const { failCase, successCase } = require("./utils/requestHandler");

//database
connect()

//Cors
app.use(cors());
app.use(morgan("dev"));
app.use(json())
app.use(urlencoded({ extended: true }));

const port = parseInt(process.argv[2]) || process.env.PORT || 3000;
app.set("port", port);

app.use('*',(req,res,next) => {
    res.fail=failCase({req,res})
    res.success=successCase({req,res})
    next()
})

//routes
app.use('/api',mainRouter)


//handle other requests with 404 if not handled previously
app.use("*", (req, res, next) => {
    return res.status(404).json({
      success: false,
      message: "Api endpoint not found !!!",
    });
  });
  

  app.listen(port, () => {
    console.log(
      `Server is listening at http: //localhost: ${Date()}`,
      `, PORT ==`,
      port
    );
  });