const express = require('express');
const app = express();
const cors =require("cors");
const corsConfig =require("./config/corsConfig");
const cookieParser=require("cookie-parser")
const {logger} = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const morgan =require("morgan");
const session = require("express-session");

app.use(session({
    secret: "adsadsadas", // ✅ Güvenlik için rastgele bir string olmalı
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 } // 1 saatlik oturum süresi
}));

// şablon motoru ejs
app.set("view engine", "ejs"); // EJS şablon motorunu kullan
app.use(express.static("public")); // Statik dosyaları kullan

// MIDDLEWARES
app.use(cors(corsConfig.corsOption));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(logger);
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.redirect("/index"); // Kullanıcıyı /login sayfasına yönlendir
});

// ROUTES
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const mealRoutes = require('./routes/mealRoutes');
const rateRoutes = require('./routes/userRateRoutes');
const commentRoutes =require('./routes/commentRoutes');
const indexRoutes = require("./routes/indexRoutes");
const middlewareRoutes =require("./routes/middleRoutes");
//admin routes
const userAdminPanel = require("./routes/userPanel/userPanel")
const mealAdminPanel = require("./routes/userPanel/mealPanel")
const commentAdminPanel = require("./routes/userPanel/commentPanel")
// ROUTES
app.use('/api/users',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/meals',mealRoutes);
app.use('/api/rate',rateRoutes);
app.use('/api/comment',commentRoutes);

//admin panel
app.use("/",indexRoutes);
app.use("/user",userAdminPanel);
app.use("/meal",mealAdminPanel);
app.use("/comment",commentAdminPanel);

//middle routtes
app.use("/",middlewareRoutes)


app.use(errorHandler);

module.exports = app;