const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initDb = async () => {
    await Listing.deleteMany({});

   initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "6a7601149bab574e21077db3"
}));

    await Listing.insertMany(initData.data);

    console.log("data was initialized");
};

main()
    .then(() => {
        console.log("connected to db wanderlust database");
        initDb();
    })
    .catch((err) => {
        console.log(err);
    });