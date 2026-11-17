const Joi = require("joi");
const { listingCategoryValues } = require("../utils/listingCategories");

const listingSearchSchema = Joi.object({
    q: Joi.string().trim().max(100).allow("").default(""),
    category: Joi.string().valid(...listingCategoryValues).allow("").default(""),
    minPrice: Joi.number().min(0).empty("").optional(),
    maxPrice: Joi.number().min(0).empty("").optional(),
    sort: Joi.string().valid("newest", "price-low", "price-high").default("newest"),
});

const listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().trim().min(3).max(100).required(),
        description: Joi.string().trim().min(10).max(2000).required(),
        location: Joi.string().trim().min(2).max(120).required(),
        country: Joi.string().trim().min(2).max(80).required(),
        price: Joi.number().required().min(0),
        category: Joi.string().valid(...listingCategoryValues).empty("").optional(),
        image: Joi.object({
            filename: Joi.string().allow("", null),
            url: Joi.string().allow("", null),
        }).allow(null)
    }).required()
});

module.exports = { listingSchema };
module.exports.listingSearchSchema = listingSearchSchema;

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().trim().min(10).max(1000).required()
    }).required()
});