const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {savedRedirectUrl} = require("../middlewares/userMiddleware.js");
const userController = require("../controllers/userController.js");

router.get("/signup", userController.signupForm);

router.post("/signup", wrapAsync(userController.signAuth));

router.get("/login", userController.loginForm);

router.post("/login", savedRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), userController.loginAuth);

router.get("/logout", userController.logoutAuth);

module.exports = router;