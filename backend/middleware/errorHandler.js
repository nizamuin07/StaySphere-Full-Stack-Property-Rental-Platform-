const ExpressError = require("../utils/ExpressError");

function notFound(req, res, next) {
    next(new ExpressError(404, "Page Not Found!"));
}

function errorHandler(error, req, res, next) {
    const statusCode = error.statusCode || error.status || 500;
    const message = error.message || "Something went wrong!";
    res.status(statusCode).render("error.ejs", { message });
}

module.exports = { notFound, errorHandler };
