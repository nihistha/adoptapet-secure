const validateRequest = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body); // Validate the request body against the schema
        next(); // Proceed if validation passes
    } catch (error) {
        // Send validation errors as a response
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: error.errors.map((err) => ({
                field: err.path[0],
                message: err.message,
            })),
        });
    }
};

module.exports = { validateRequest };
