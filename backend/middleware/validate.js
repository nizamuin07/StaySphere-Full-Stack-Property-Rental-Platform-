const ExpressError = require("../utils/ExpressError");
const { listingSchema, listingSearchSchema, reviewSchema } = require("../validation/schemas");

function validateListing(req, res, next) {
    const { error, value } = listingSchema.validate(req.body);
    if (error) {
        return next(new ExpressError(
            400,
            error.details.map((detail) => detail.message).join(", ")
        ));
    }

    req.body = value;
    next();
}

function validateListingSearch(req, res, next) {
    const { error, value } = listingSearchSchema.validate(req.query);
    if (error) {
        return next(new ExpressError(
            400,
            error.details.map((detail) => detail.message).join(", ")
        ));
    }
    if (value.minPrice !== undefined && value.maxPrice !== undefined &&
        value.minPrice > value.maxPrice) {
        return next(new ExpressError(400, "Minimum price cannot be greater than maximum price."));
    }

    req.listingFilters = value;
    next();
}

function validateReview(req, res, next) {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        return next(new ExpressError(
            400,
            error.details.map((detail) => detail.message).join(", ")
        ));
    }

    next();
}

module.exports = { validateListing, validateListingSearch, validateReview };
