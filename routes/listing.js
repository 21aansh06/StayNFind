const express = require("express")
const router = express.Router()
const wrapAsync = require("../utils/wrapAsync.js")
const expressError = require("../utils/expressError.js")
const Listing = require("../models/listing.js")
const authenticate = require("../views/authenticate.js")
const listingController = require("../controllers/listing.js")
const multer = require("multer")
const {storage} = require("../cloudinary_config.js")
const upload = multer({storage})

//Index route
router.get("/", wrapAsync(listingController.index))

// New route
router.get("/new", authenticate.isLoggedin, listingController.renderNewForm)

router.post("/", authenticate.isLoggedin, upload.single("image[url]"),listingController.saveListing
)

//Edit route
router.get("/:id/edit", authenticate.isLoggedin, wrapAsync(listingController.editForm))

//Editdata route
router.put("/:id", authenticate.isLoggedin, upload.single("image[url]"),wrapAsync(listingController.saveEditListing))

//Delete route
router.delete("/:id", authenticate.isLoggedin, wrapAsync(listingController.deleteListing))

//Show route
router.get("/:id", wrapAsync(listingController.showListing));
module.exports = router