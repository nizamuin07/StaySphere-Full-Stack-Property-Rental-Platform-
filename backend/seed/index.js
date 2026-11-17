const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

require("dotenv").config();
const mongoUrl = process.env.MONGODB_URI || process.env.ATLAS_DB_URL ||
    "mongodb://127.0.0.1:27017/staysphere_dev";

const initDb = async () => {
    await Listing.deleteMany({});

    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: "6a7601149bab574e21077db3",
    }));

    await Listing.insertMany(initData.data);
    console.log("StaySphere seed data initialized.");
};

async function seed() {
    await mongoose.connect(mongoUrl);
    await initDb();
}

if (require.main === module) {
    seed()
        .catch((error) => {
            console.error("Could not initialize StaySphere seed data:", error.message);
            process.exitCode = 1;
        })
        .finally(() => mongoose.disconnect());
}

module.exports = { seed };