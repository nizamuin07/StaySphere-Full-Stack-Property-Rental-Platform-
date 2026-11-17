const User = require("../models/users");

exports.renderSignup = (req, res) => {
    res.render("users/signup");
};

exports.signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (error) => {
            if (error) return next(error);
            req.flash("success", "Welcome to StaySphere!");
            res.redirect("/listings");
        });
    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/signup");
    }
};

exports.renderLogin = (req, res) => {
    res.render("users/login");
};

exports.loginSuccess = (req, res) => {
    req.flash("success", "Welcome back to StaySphere!");
    const returnTo = req.session.returnTo;
    delete req.session.returnTo;
    res.redirect(
        typeof returnTo === "string" && returnTo.startsWith("/") && !returnTo.startsWith("//")
            ? returnTo
            : "/listings"
    );
};

exports.logout = (req, res, next) => {
    req.logout((error) => {
        if (error) return next(error);
        req.flash("success", "Logged Out Successfully!");
        res.redirect("/listings");
    });
};
