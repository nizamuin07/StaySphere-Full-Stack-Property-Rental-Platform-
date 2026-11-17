const { destinations } = require("../utils/restaurantRecommendations");

exports.index = (req, res) => {
    const selectedDestination = destinations.find(
        ({ name }) => name.toLowerCase() === String(req.query.destination || "").toLowerCase()
    ) || null;

    res.render("restaurants/index", {
        destinations,
        selectedDestination,
    });
};
