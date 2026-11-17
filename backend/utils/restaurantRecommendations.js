const destinations = [
    {
        name: "Goa",
        restaurants: [
            {
                name: "Gunpowder",
                cuisine: "Indian and Goan-inspired",
                area: "Assagao",
                image: {
                    url: "/images/restaurants/gunpowder.jpg",
                    alt: "Indian curry with herbs, an illustrative food photo and not a photo of Gunpowder",
                },
            },
            {
                name: "Vinayak Family Restaurant",
                cuisine: "Goan seafood",
                area: "Assagao",
                image: {
                    url: "/images/restaurants/vinayak-family-restaurant.jpg",
                    alt: "Grilled fish with greens, an illustrative seafood photo and not a photo of Vinayak Family Restaurant",
                },
            },
            {
                name: "The Fisherman's Wharf",
                cuisine: "Goan and coastal",
                area: "Cavelossim",
                image: {
                    url: "/images/restaurants/fishermans-wharf.jpg",
                    alt: "Coastal seafood salad, an illustrative food photo and not a photo of The Fisherman's Wharf",
                },
            },
        ],
    },
    {
        name: "Manali",
        restaurants: [
            {
                name: "Cafe 1947",
                cuisine: "Cafe and Italian",
                area: "Old Manali",
                image: {
                    url: "/images/restaurants/cafe-1947.jpg",
                    alt: "Cheesy pizza, an illustrative food photo and not a photo of Cafe 1947",
                },
            },
            {
                name: "Johnson's Cafe",
                cuisine: "Continental and Indian",
                area: "Siyal",
                image: {
                    url: "/images/restaurants/johnsons-cafe.jpg",
                    alt: "Colorful cafe bowl with vegetables and grains, an illustrative food photo and not a photo of Johnson's Cafe",
                },
            },
            {
                name: "Chopsticks",
                cuisine: "Asian and Tibetan",
                area: "Mall Road",
                image: {
                    url: "/images/restaurants/chopsticks.jpg",
                    alt: "Ramen with noodles and egg, an illustrative food photo and not a photo of Chopsticks",
                },
            },
        ],
    },
    {
        name: "Jaipur",
        restaurants: [
            {
                name: "Laxmi Misthan Bhandar",
                cuisine: "Rajasthani and Indian",
                area: "Johari Bazaar",
                image: {
                    url: "/images/restaurants/laxmi-misthan-bhandar.jpg",
                    alt: "Dessert cups, an illustrative sweets photo and not a photo of Laxmi Misthan Bhandar",
                },
            },
            {
                name: "Tapri Central",
                cuisine: "Cafe and Indian",
                area: "C-Scheme",
                image: {
                    url: "/images/restaurants/tapri-central.jpg",
                    alt: "Iced coffee, an illustrative cafe photo and not a photo of Tapri Central",
                },
            },
            {
                name: "Rawat Misthan Bhandar",
                cuisine: "Rajasthani snacks",
                area: "Sindhi Camp",
                image: {
                    url: "/images/restaurants/rawat-misthan-bhandar.jpg",
                    alt: "Samosas with green chile, an illustrative food photo and not a photo of Rawat Misthan Bhandar",
                },
            },
        ],
    },
];

function getRestaurantRecommendations(location) {
    const normalizedLocation = String(location || "").toLocaleLowerCase();

    return destinations.find(({ name }) =>
        normalizedLocation.includes(name.toLocaleLowerCase())
    ) || null;
}

module.exports = { destinations, getRestaurantRecommendations };
