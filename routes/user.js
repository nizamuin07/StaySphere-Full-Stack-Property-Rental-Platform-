const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../models/users");

// ================= SIGNUP =================

// Signup Page
router.get("/signup", (req, res) => {
    res.render("users/signup");
});

// Signup Logic
router.post("/signup", async (req, res, next) => {
    try {
        let { username, email, password } = req.body;

        const newUser = new User({
            email,
            username,
        });

        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }

            req.flash("success", "Welcome to StaySphere!");
            res.redirect("/listings");
        });

    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
});

// ================= LOGIN =================

// Login Page
router.get("/login", (req, res) => {
    res.render("users/login");
});

// Login Logic
router.post(
    "/login",
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    (req, res) => {
        req.flash("success", "Welcome back to StaySphere!");
        res.redirect("/listings");
    }
);

// ================= LOGOUT =================

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        req.flash("success", "Logged Out Successfully!");
        res.redirect("/listings");
    });
});

module.exports = router;