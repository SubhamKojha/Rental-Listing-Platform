const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn} = require("../middlewares/userMiddleware.js");
const {isOwner} = require("../middlewares/authorization.js");
const {validateListing} = require("../middlewares/validations.js");
const listingController = require("../controllers/listingController.js");

const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const uploads = multer({ storage });

//Index Route
router.get("/", wrapAsync (listingController.index));
 
//New Route
router.get("/new", isLoggedIn, listingController.newForm);

//Create Route
router.post("/", isLoggedIn, validateListing, uploads.single('listing[image]'), wrapAsync (listingController.createListing));

//Show Route
router.get("/:id", wrapAsync (listingController.showListings));

//Edit Listing
router.get("/:id/edit", isLoggedIn, isOwner,  uploads.single('listing[image]'), wrapAsync (listingController.editForm));

//Update Route
router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync (listingController.updateListing));

//Delete Route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync (listingController.deleteListing));

module.exports = router;