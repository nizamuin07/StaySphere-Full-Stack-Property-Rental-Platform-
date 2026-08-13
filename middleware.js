const Listing = require("./models/listing");
const Review = require("./models/review");

// ================= LOGIN MIDDLEWARE =================

module.exports.isLoggedIn = (req, res, next) => {

    if (!req.isAuthenticated()) {

        req.flash("error", "You must be logged in first.");

        return res.redirect("/login");
    }

    next();
};


// ================= OWNER MIDDLEWARE =================

module.exports.isOwner = async (req, res, next) => {

    let { id } = req.params;

    let listing = await Listing.findById(id);

    if (!listing.owner.equals(res.locals.currUser._id)) {

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

    let review = await Review.findById(reviewId);

    if (!review.author.equals(res.locals.currUser._id)) {

        req.flash(
            "error",
            "You do not have permission to delete this review."
        );

        return res.redirect(`/listings/${req.params.id}`);
    }

    next();
};