const User = require("../models/user")

module.exports.signupForm = (req, res) => {
    res.render("./users/signup.ejs")
}
module.exports.saveUser = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err)=>{
             if (err) {
            next(err)
        }
        req.flash("success", "Welcome to StayNFind!");
        res.redirect("/listings");
        })

    } catch (error) {
        req.flash("error", error.message.toString());
        res.redirect("/signup");
    }
}
module.exports.loginForm = (req, res) => {
    res.render("./users/login.ejs")
    console.log(req.flash("error"));
}
module.exports.loginUser =  (req, res) => {
    req.flash("success", "Welcome back to StayNFind")
 const redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);

}
module.exports.logoutUser = (req, res) => {
    req.logOut((err) => {
        if (err) {
            next(err)
        }
        req.flash("success", "You have been logout")
        res.redirect("/listings")
    })
}