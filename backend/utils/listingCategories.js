const listingCategories = [
    { value: "Beach", label: "Beach", icon: "🏖️" },
    { value: "Mountains", label: "Mountains", icon: "🏔️" },
    { value: "Villas", label: "Villas", icon: "🏡" },
    { value: "Camping", label: "Camping", icon: "🏕️" },
    { value: "Lake", label: "Lake", icon: "🌊" },
    { value: "Cities", label: "Cities", icon: "🏙️" },
    { value: "Countryside", label: "Countryside", icon: "🌳" },
    { value: "Unique Stays", label: "Unique Stays", icon: "✨" },
];

const listingCategoryValues = listingCategories.map(({ value }) => value);

module.exports = { listingCategories, listingCategoryValues };
