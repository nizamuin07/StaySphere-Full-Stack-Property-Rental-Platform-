const express = require("express");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const User = require("./models/users");
const listingRouter = require("./routes/listing");
const reviewRouter = require("./routes/review");
const userRouter = require("./routes/user");
const restaurantRouter = require("./routes/restaurant");
const { notFound, errorHandler } = require("./middleware/errorHandler");

function createApp(store) {
    const app = express();

    if (process.env.NODE_ENV === "production") {
        app.set("trust proxy", 1);
    }

    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "../frontend/views"));
    app.engine("ejs", ejsMate);

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(methodOverride("_method"));
    app.use(express.static(path.join(__dirname, "../frontend/public")));

    const sessionOptions = {
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        },
    };
    if (store) sessionOptions.store = store;
    app.use(session(sessionOptions));
    app.use(flash());

    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    app.use((req, res, next) => {
        res.locals.success = req.flash("success");
        res.locals.error = req.flash("error");
        res.locals.currUser = req.user;
        next();
    });

    app.get("/", (req, res) => {
        res.render("home");
    });

    app.use("/listings", listingRouter);
    app.use("/listings/:id/reviews", reviewRouter);
    app.use("/restaurants", restaurantRouter);
    app.use("/", userRouter);
    app.use(notFound);
    app.use(errorHandler);

    return app;
}

module.exports = createApp;
