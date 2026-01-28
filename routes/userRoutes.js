const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { savedRedirectUrl } = require("../middlewares/userMiddleware.js");
const userController = require("../controllers/userController.js");

router.post("/signup", wrapAsync(userController.signAuth));

router.post(
  "/login",
  savedRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "back",
    failureFlash: true
  }),
  userController.loginAuth
);

router.get("/logout", userController.logoutAuth);

module.exports = router;