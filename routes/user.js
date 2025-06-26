const express = require("express")
const { route } = require("./listing")
const router = express.Router({ mergeParams: true })
const User = require("../models/user")
const wrapAsync = require("../utils/wrapAsync")
const passport = require("passport")
const authenticate = require("../views/authenticate.js")
const userController = require("../controllers/user.js")


router.get("/signup", userController.signupForm)
router.post("/signup", wrapAsync(userController.saveUser));

router.get("/login", userController.loginForm)

router.get("/logout", userController.logoutUser)

router.post("/login",
    authenticate.saveRedirectUrl,
    passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),
    userController.loginUser)
module.exports = router