if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);

const expressError = require("./utils/expressError.js");
const listingRouter = require("./routes/listing");
const reviewRouter = require("./routes/review");
const userRouter = require("./routes/user.js");

const db_url = process.env.ATLAS_URL

// Database Connection
async function main() {
    await mongoose.connect(db_url);
}
main()
    .then(() => console.log("DB connected successfully"))
    .catch((err) => console.log(err));

// Session & Flash Setup
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const store = MongoStore.create({
    mongoUrl: db_url,
    crypto:{
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600
})
const sessionOptions = {
    store: store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(session(sessionOptions));
app.use(flash());

// Passport Auth Setup
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    res.locals.currUser = req.user
    next();
});

// Routes
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);
app.get("/terms", (req,res)=>{
    res.render("./layouts/terms.ejs")
})
app.get('/', (req, res) => {
  res.redirect('/listings');
});
app.get("/privacy", (req,res)=>{
    res.render("./layouts/privacy.ejs")
})

app.use((req, res, next) => {
    next(new expressError(404, "Page not found"));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.render("error.ejs", { err });
});

app.listen(3000,'0.0.0.0',  () => {
    console.log("Listening on port 3000...");
});