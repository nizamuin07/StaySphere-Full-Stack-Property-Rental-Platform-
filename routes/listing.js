const express = require("express");
const router = express.Router();

const Listing = require("../models/listing");

const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { listingSchema } = require("../schema");
const { isLoggedIn, isOwner } = require("../middleware");

const multer = require('multer')
const {storage}=require("../cloudConfig")
const upload = multer({storage});



// ================= Validation Middleware =================

const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);

    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }

    next();
};


// ================= INDEX ROUTE =================

router.get(
    "/",
    wrapAsync(async (req, res) => {
        const allistings = await Listing.find({});
        res.render("listings/index", { allistings });
    })
);


router.post(
    "/",
    upload.array("listing[image][url]"),
    async (req, res) => {

        let newListing = new Listing(req.body.listing);

        newListing.owner = req.user._id;

        if (req.file) {
            newListing.image = {
                url: req.file.path,
                filename: req.file.filename
            };
        }

        await newListing.save();

        res.redirect("/listings");
    }
);


// ================= NEW ROUTE =================

router.get("/new", isLoggedIn,(req, res) => {
    res.render("listings/new");
});


// ================= SHOW ROUTE =================

router.get(
    "/:id",
    wrapAsync(async (req, res) => {
        let { id } = req.params;

        const listing = await Listing.findById(id)
            .populate("reviews")
            .populate("owner");

        res.render("listings/show", { listing });
    })
);


// ================= CREATE ROUTE =================

router.post(
    "/",
    isLoggedIn,
    validateListing,
    wrapAsync(async (req, res) => {

        if (
            req.body.listing.image &&
            !req.body.listing.image.url
        ) {
            delete req.body.listing.image;
        }

        const newListing = new Listing(req.body.listing);

        newListing.owner = req.user._id;

        await newListing.save();

        req.flash("success", "New listing created");

        res.redirect("/listings");
    })
);


// ================= EDIT ROUTE =================

router.get(
    "/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(async (req, res) => {

        let { id } = req.params;

        const listing = await Listing.findById(id);

        res.render("listings/edit", { listing });
    })
);


// ================= UPDATE ROUTE =================

router.put(
    "/:id",
    isLoggedIn,
    isOwner,
    upload.single("listing[image][url]"),
    validateListing,
    wrapAsync(async (req, res) => {

        let { id } = req.params;

        let updateData = {
            ...req.body.listing
        };

        // If a new image is uploaded
        if (req.file) {
            updateData.image = {
                url: req.file.path,
                filename: req.file.filename
            };
        }

        await Listing.findByIdAndUpdate(id, updateData);

        req.flash("success", "Listing updated successfully");

        res.redirect(`/listings/${id}`);
    })
);


// ================= DELETE ROUTE =================

router.delete(
    "/:id",
    isLoggedIn,
    isOwner,
    wrapAsync(async (req, res) => {

        let { id } = req.params;

        await Listing.findByIdAndDelete(id);

        req.flash("success", "Listing deleted successfully");

        res.redirect("/listings");
    })
);
router.get("/listings", async (req, res) => {

    let { category } = req.query;

    let allistings;

    if (category) {
        allistings = await Listing.find({ category: category });
    } else {
        allistings = await Listing.find({});
    }

    res.render("listings/index.ejs", { allistings });
});


module.exports = router;