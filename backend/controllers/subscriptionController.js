const Subscription = require("../models/subscription.model");

// Helper: plan details
const getPlanDetails = (planName) => {
    switch (planName) {
        case "Basic":
            return { screens: 1, quality: "Good" };
        case "Standard":
            return { screens: 2, quality: "Better" };
        case "Premium":
            return { screens: 4, quality: "Best" };
        default:
            return { screens: 1, quality: "Good" };
    }
};

// ---------------- CREATE SUBSCRIPTION ----------------
const createSubscription = async (req, res) => {
    try {
        let { userName, planName, monthlyPrice, duration } = req.body;

        const parsedPrice = Number(monthlyPrice);
        const parsedDuration = Number(duration);

        // Validation
        if (!userName || !planName || isNaN(parsedPrice) || isNaN(parsedDuration)) {
            return res.status(400).json({
                message: "Invalid or missing subscription data",
            });
        }

        const validPlans = ["Basic", "Standard", "Premium"];
        if (!validPlans.includes(planName)) {
            return res.status(400).json({
                message: "Invalid plan name",
            });
        }

        // Prevent duplicate active subscriptions
        const existingActive = await Subscription.findOne({
            userName,
            status: "Active",
        });

        if (existingActive) {
            return res.status(400).json({
                message: "User already has an active subscription",
            });
        }

        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + parsedDuration);

        const totalAmount = parsedPrice * parsedDuration;
        const { screens, quality } = getPlanDetails(planName);

        const subscription = new Subscription({
            userName,
            planName,
            monthlyPrice: parsedPrice,
            duration: parsedDuration,
            totalAmount,
            videoQuality: quality,
            screensAllowed: screens,
            startDate,
            endDate,
            status: "Active",
        });

        await subscription.save();

        res.status(201).json({
            message: "Subscription created successfully",
            subscription,
        });
    } catch (error) {
        console.error("Create subscription error:", error);
        res.status(500).json({
            message: "Server error while creating subscription",
        });
    }
};

// ---------------- GET SUBSCRIPTIONS BY USER ----------------
const getSubscriptionsByUser = async (req, res) => {
    try {
        const { userName } = req.params;

        if (!userName) {
            return res.status(400).json({
                message: "Missing userName parameter",
            });
        }

        const subscriptions = await Subscription.find({ userName }).sort({
            createdAt: -1,
        });

        res.json({ subscriptions });
    } catch (error) {
        console.error("Get subscriptions error:", error);
        res.status(500).json({
            message: "Server error while fetching subscriptions",
        });
    }
};

// ---------------- GET 6-MONTH SUBSCRIPTIONS ----------------
const getSixMonthSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find({ duration: 6 }).sort({
            createdAt: -1,
        });

        res.json({ subscriptions });
    } catch (error) {
        console.error("Get 6-month subscriptions error:", error);
        res.status(500).json({
            message: "Server error while fetching 6-month subscriptions",
        });
    }
};

// ---------------- UPDATE SUBSCRIPTION ----------------
const updateSubscription = async (req, res) => {
    try {
        const { id } = req.params;
        const { planName, monthlyPrice, duration } = req.body;

        const subscription = await Subscription.findById(id);
        if (!subscription) {
            return res.status(404).json({
                message: "Subscription not found",
            });
        }

        if (subscription.status !== "Active") {
            return res.status(400).json({
                message: "Only active subscriptions can be updated",
            });
        }

        const parsedPrice =
            monthlyPrice !== undefined ? Number(monthlyPrice) : undefined;
        const parsedDuration = duration !== undefined ? Number(duration) : 0;

        const validPlans = ["Basic", "Standard", "Premium"];
        if (planName && !validPlans.includes(planName)) {
            return res.status(400).json({
                message: "Invalid plan name",
            });
        }

        if (planName) {
            subscription.planName = planName;
            const details = getPlanDetails(planName);
            subscription.videoQuality = details.quality;
            subscription.screensAllowed = details.screens;
        }

        if (parsedPrice !== undefined && !isNaN(parsedPrice)) {
            subscription.monthlyPrice = parsedPrice;
        }

        const now = new Date();
        let remainingMonths = 0;

        if (subscription.endDate && subscription.endDate > now) {
            const msPerMonth = 30 * 24 * 60 * 60 * 1000;
            remainingMonths = Math.ceil(
                (subscription.endDate - now) / msPerMonth
            );
        }

        const addedMonths = parsedDuration > 0 ? parsedDuration : 0;
        if (addedMonths > 0) {
            const newEnd = new Date(subscription.endDate);
            newEnd.setMonth(newEnd.getMonth() + addedMonths);
            subscription.endDate = newEnd;
        }

        subscription.totalAmount =
            subscription.monthlyPrice * (remainingMonths + addedMonths);

        await subscription.save();

        res.json({
            message: "Subscription updated successfully",
            subscription,
        });
    } catch (error) {
        console.error("Update subscription error:", error);
        res.status(500).json({
            message: "Server error while updating subscription",
        });
    }
};

// ---------------- CANCEL SUBSCRIPTION ----------------
const cancelSubscription = async (req, res) => {
    try {
        const { id } = req.params;

        const subscription = await Subscription.findById(id);
        if (!subscription) {
            return res.status(404).json({
                message: "Subscription not found",
            });
        }

        subscription.status = "Expired";
        subscription.endDate = new Date();
        await subscription.save();

        res.json({
            message: "Subscription cancelled successfully",
            subscription,
        });
    } catch (error) {
        console.error("Cancel subscription error:", error);
        res.status(500).json({
            message: "Server error while cancelling subscription",
        });
    }
};

// ---------------- EXPORTS ----------------
module.exports = {
    createSubscription,
    getSubscriptionsByUser,
    getSixMonthSubscriptions,
    updateSubscription,
    cancelSubscription,
};
