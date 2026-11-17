const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");
const { listingCategories } = require("../utils/listingCategories");
const { getRestaurantRecommendations } = require("../utils/restaurantRecommendations");

exports.index = async (req, res) => {
    const filters = req.listingFilters;
    const criteria = {};
    const conditions = [];

    if (filters.category === "Unique Stays") {
        conditions.push({
            $or: [
                { category: "Unique Stays" },
                { category: { $exists: false } },
            ],
        });
    } else if (filters.category) {
        criteria.category = filters.category;
    }

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
        criteria.price = {};
        if (filters.minPrice !== undefined) criteria.price.$gte = filters.minPrice;
        if (filters.maxPrice !== undefined) criteria.price.$lte = filters.maxPrice;
    }

    if (filters.q) {
        const escapedQuery = filters.q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const searchPattern = new RegExp(escapedQuery, "i");
        conditions.push({
            $or: [
                { title: searchPattern },
                { description: searchPattern },
                { location: searchPattern },
                { country: searchPattern },
            ],
        });
    }

    if (conditions.length) criteria.$and = conditions;

    const sortOptions = {
        newest: { createdAt: -1, _id: -1 },
        "price-low": { price: 1, _id: -1 },
        "price-high": { price: -1, _id: -1 },
    };
    const allistings = await Listing.find(criteria)
        .populate({ path: "reviews", select: "rating" })
        .sort(sortOptions[filters.sort]);

    res.render("listings/index", {
        allistings,
        filters,
        categories: listingCategories,
    });
};

exports.renderNew = (req, res) => {
    res.render("listings/new", { categories: listingCategories });
};

exports.create = async (req, res) => {
    if (!req.file) {
        throw new ExpressError(400, "Please upload a property image.");
    }

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {
        url: req.file.path,
        filename: req.file.filename,
    };

    await newListing.save();
    req.flash("success", "New listing created.");
    res.redirect("/listings");
};

exports.show = async (req, res) => {
    const listing = await Listing.findById(req.params.id)
        .populate("owner")
        .populate({
            path: "reviews",
            populate: { path: "author" },
        });

    if (!listing) {
        throw new ExpressError(404, "Listing not found");
    }

    const reviewCount = listing.reviews.length;
    const averageRating = reviewCount
        ? listing.reviews.reduce((total, review) => total + review.rating, 0) / reviewCount
        : null;

    res.render("listings/show", {
        listing,
        averageRating,
        restaurantRecommendations: getRestaurantRecommendations(listing.location),
    });
};

exports.renderEdit = async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    res.render("listings/edit", { listing, categories: listingCategories });
};

exports.update = async (req, res) => {
    const updateData = { ...req.body.listing };

    if (req.file) {
        updateData.image = {
            url: req.file.path,
            filename: req.file.filename,
        };
    } else {
        delete updateData.image;
    }

    await Listing.findByIdAndUpdate(req.params.id, updateData, {
        runValidators: true,
    });
    req.flash("success", "Listing updated successfully.");
    res.redirect(`/listings/${req.params.id}`);
};

exports.remove = async (req, res) => {
    await Listing.findByIdAndDelete(req.params.id);
    req.flash("success", "Listing deleted successfully.");
    res.redirect("/listings");
};
