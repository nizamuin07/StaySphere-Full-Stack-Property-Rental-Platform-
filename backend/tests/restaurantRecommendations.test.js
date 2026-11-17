const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const { destinations, getRestaurantRecommendations } = require("../utils/restaurantRecommendations");

test("provides curated restaurant suggestions for the selected destinations", () => {
    assert.deepEqual(destinations.map(({ name }) => name), ["Goa", "Manali", "Jaipur"]);
    const restaurants = destinations.flatMap(({ restaurants: destinationRestaurants }) => destinationRestaurants);
    assert.equal(new Set(restaurants.map(({ image }) => image.url)).size, restaurants.length,
        "Each restaurant should have a distinct illustration");

    for (const destination of destinations) {
        assert.ok(destination.restaurants.length >= 3);
        assert.ok(destination.restaurants.every(({ name, cuisine, area, image }) =>
            name && cuisine && area && image.url && image.alt
        ));
        for (const restaurant of destination.restaurants) {
            const imagePath = path.join(__dirname, "../../frontend/public", restaurant.image.url.slice(1));
            assert.ok(fs.existsSync(imagePath), `Missing restaurant image: ${imagePath}`);
        }
    }
});

test("matches destination names case-insensitively within listing locations", () => {
    assert.equal(getRestaurantRecommendations("North Goa, India").name, "Goa");
    assert.equal(getRestaurantRecommendations("Old MANALI").name, "Manali");
    assert.equal(getRestaurantRecommendations("Jaipur, Rajasthan").name, "Jaipur");
});

test("returns no city-specific suggestions for unsupported locations", () => {
    assert.equal(getRestaurantRecommendations("Tokyo, Japan"), null);
    assert.equal(getRestaurantRecommendations(null), null);
});
