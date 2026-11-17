const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isReviewAuthor } = require("../middleware/auth");
const { validateReview } = require("../middleware/validate");
const reviewController = require("../controllers/reviewController");

router.post(
    "/",
    isLoggedIn,
    validateReview,
    wrapAsync(reviewController.create)
);

router.delete(
    "/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.remove)
);

module.exports = router;