const express = require("express");
const URL = require("./models/url.js");
const path = require("path");
const {connectMongoDb} = require("./connect.js");
const cookieParser = require("cookie-parser");
const app =express();
const PORT = 8001;

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user")
const {restrictToLoggedInUserOnly,checkAuth} = require("./middlewares/auth");
const mongoUrl =""
connectMongoDb(mongoUrl)

app.set('view engine',"ejs");
app.set("views",path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use("/url",restrictToLoggedInUserOnly,urlRoute);
app.use("/user",userRoute);
app.use("/",checkAuth,staticRoute);



app.listen(PORT,()=>console.log(`Server Started at ${PORT}`));
