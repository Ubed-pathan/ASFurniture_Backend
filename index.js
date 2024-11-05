const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const homeroute = require('./routes/home')
const bedroute = require('./routes/bed')
const wardroberoute = require('./routes/wardrobe')
const counterroute = require('./routes/counter')
const otherroute = require('./routes/other')
const dressing_tableroute = require('./routes/dressing_table')
const userRoute = require('./routes/user');
const contactForm = require('./routes/contactForm');
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require("./middlewares/authentication");


const app = express();
const PORT = 8888;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
        origin: 'http://localhost:1111', 
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 
        credentials: true    
    }))

app.use(cookieParser());
app.use(checkForAuthenticationCookie("log"));


// note if all images in only one folder then use 
// app.use('/public', express.static(path.resolve('./public')));


// note if images in different folder under root folder like public then use this below code
// but in this project images in different folder under root folder like so i using this below code
app.use('/public', express.static(path.join(__dirname, 'public')));

mongoose.connect("mongodb://localhost:27017/ASFurniture")
        .then(() => console.log("MongoDB Connected"))
        .catch((err) => console.log(err));





app.use("/home", homeroute);
app.use("/bed", bedroute);
app.use("/wardrobe", wardroberoute);
app.use("/other", otherroute);
app.use("/counter", counterroute);
app.use("/dressing_table", dressing_tableroute);


app.use("/user", userRoute);

app.use("/contactform", contactForm);


app.listen(PORT, () => console.log(`Server Started at PORT :${PORT}`));
