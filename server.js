if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const mongoose = require("mongoose");
const MongoStore = require("connect-mongo").default;
const createApp = require("./backend/app");

async function startServer() {
    const mongoUrl = process.env.MONGODB_URI || process.env.ATLAS_DB_URL;
    if (!mongoUrl) {
        throw new Error("Set ATLAS_DB_URL or MONGODB_URI before starting StaySphere.");
    }
    if (!process.env.SECRET) {
        throw new Error("Set SECRET before starting StaySphere.");
    }

    await mongoose.connect(mongoUrl);
    console.log("Connected to StaySphere database");

    const store = MongoStore.create({
        clientPromise: Promise.resolve(mongoose.connection.getClient()),
        crypto: { secret: process.env.SECRET },
        touchAfter: 24 * 60 * 60,
    });
    store.on("error", (error) => {
        console.error("MongoDB session store error:", error.message);
    });

    const app = createApp(store);
    const port = process.env.PORT || 8080;
    return app.listen(port, () => {
        console.log(`StaySphere is running at http://localhost:${port}`);
    });
}

if (require.main === module) {
    startServer().catch((error) => {
        console.error("StaySphere could not start:", error.message);
        process.exitCode = 1;
    });
}

module.exports = startServer;
