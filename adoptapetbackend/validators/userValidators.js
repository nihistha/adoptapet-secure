const { z } = require("zod");

// Zod schema for user registration validation
const userSchema = z.object({
    fullname: z
        .string()
        .min(1, { message: "Full name is required" })
        .max(100, { message: "Full name must be 100 characters or less" }),
    phonenumber: z
        .string()
        .regex(/^\d{10}$/, { message: "Phone number must be 10 digits" }),
    email: z
        .string()
        .email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(50, { message: "Password must be 50 characters or less" }),
    confirmPassword: z
        .string()
        .min(8, { message: "Confirm Password must be at least 8 chasracters long" })
        .max(50, { message: "Confirm Password must be 50 characters or less" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
});

module.exports = { userSchema };
