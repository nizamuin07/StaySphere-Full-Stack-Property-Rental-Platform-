const Listing = require("../models/listing");
const Review = require("../models/review");
const ExpressError = require("../utils/ExpressError");

// ================= LOGIN MIDDLEWARE =================

module.exports.isLoggedIn = (req, res, next) => {

    if (!req.isAuthenticated()) {
        req.flash("error", "You must be logged in first.");
        if (req.method === "GET") {
            req.session.returnTo = req.originalUrl;
        }
        return res.redirect("/login");
    }

    next();
};


// ================= OWNER MIDDLEWARE =================

module.exports.isOwner = async (req, res, next) => {

    let { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        return next(new ExpressError(404, "Listing not found"));
    }

    if (!listing.owner || !listing.owner.equals(res.locals.currUser._id)) {

        req.flash(
            "error",
            "You do not have permission to edit or delete this listing."
        );

        return res.redirect(`/listings/${id}`);
    }

    next();
};


// ================= REVIEW AUTHOR MIDDLEWARE =================

module.exports.isReviewAuthor = async (req, res, next) => {

    let { reviewId } = req.params;

    const [review, listing] = await Promise.all([
        Review.findById(reviewId),
        Listing.findById(req.params.id),
    ]);

    if (!review || !listing || !listing.reviews.some((id) => id.equals(review._id))) {
        return next(new ExpressError(404, "Review not found"));
    }

    if (!review.author || !review.author.equals(res.locals.currUser._id)) {

        req.flash(
            "error",
            "You do not have permission to delete this review."
        );

        return res.redirect(`/listings/${req.params.id}`);
    }

    next();
};