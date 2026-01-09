const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            trim: true,
        },
        planName: {
            type: String,
            required: true,
            enum: ["Basic", "Standard", "Premium"],
        },
        monthlyPrice: {
            type: Number,
            required: true,
            min: 0,
        },
        duration: {
            type: Number,
            required: true,
            min: 1,
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        videoQuality: {
            type: String,
            enum: ["Good", "Better", "Best"],
        },
        screensAllowed: {
            type: Number,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ["Active", "Expired"],
            default: "Active",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);
