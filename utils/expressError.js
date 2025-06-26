class expressError extends Error {
    constructor(statusCode , message) {
        super()
        this.statusCode = statusCode
        this.message = message
    }
}
module.exports = expressError
// class ExpressError extends Error {
//     constructor(status, message) {
//         super(message);
//         this.status = status;
//     }
// }

// const validateReview = (req, res, next) => {
//     const { error } = reviewSchema.validate(req.body);
//     if (error) {
//         return next(new ExpressError(400, error.details[0].message));
//     }
//     next();
// };

// // Express error-handling middleware
// app.use((err, req, res, next) => {
//     const status = err.status || 500;
//     res.status(status).json({ success: false, message: err.message });
// });