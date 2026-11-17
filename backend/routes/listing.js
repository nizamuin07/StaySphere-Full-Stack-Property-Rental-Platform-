const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const listingController = require("../controllers/listingController");
const { isLoggedIn, isOwner } = require("../middleware/auth");
const { validateListing, validateListingSearch } = require("../middleware/validate");
const upload = require("../middleware/upload");

router.get("/", validateListingSearch, wrapAsync(listingController.index));
router.get("/new", isLoggedIn, listingController.renderNew);

router.post(
    "/",
    isLoggedIn,
    upload.single("listing[image][url]"),
    validateListing,
    wrapAsync(listingController.create)
);

router.get("/:id", wrapAsync(listingController.show));

router.get(
    "/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEdit)
);

router.put(
    "/:id",
    isLoggedIn,
    isOwner,
    upload.single("listing[image][url]"),
    validateListing,
    wrapAsync(listingController.update)
);

router.delete(
    "/:id",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.remove)
);

module.exports = router;
