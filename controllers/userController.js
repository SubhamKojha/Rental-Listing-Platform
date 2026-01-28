const User = require("../models/user.js");

module.exports.signAuth =  async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome User");
            res.redirect("/");
        });
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("back"); 
    }
};

module.exports.loginAuth = async (req, res) => {
    req.flash("success", "Welcome back User");
    let redirectUrl = res.locals.redirectUrl || "/";
    res.redirect(redirectUrl);
};

module.exports.logoutAuth = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You have been logged out!");
        res.redirect("/");
    });
};