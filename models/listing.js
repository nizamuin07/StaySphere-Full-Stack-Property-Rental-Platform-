const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    image: {
        filename: {
            type: String,
            default: "listingimage",
        },

        url: {
            type: String,
            default:
                "https://plus.unsplash.com/premium_photo-1733864775775-4c92c128c7e4?q=80&w=1171&auto=format&fit=crop",
        },
    },

    price: {
        type: Number,
        required: true,
    },

    location: {
        type: String,
        required: true,
    },

    country: {
        type: String,
        required: true,
    },

    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review",
    }],

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

    category: {
    type: String,
    enum: [
        "Beach",
        "Mountains",
        "Villas",
        "Camping",
        "Lake",
        "Cities",
        "Countryside"
    ]
}
});
 
listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({
            _id: {
                $in: listing.reviews
            }
        });
    }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;