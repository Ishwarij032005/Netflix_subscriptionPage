const express = require("express");
const router = express.Router();
const {
    createSubscription,
    getSubscriptionsByUser,
    updateSubscription,
    cancelSubscription,
    getSixMonthSubscriptions   // ✅ ADD THIS
} = require("../controllers/subscriptionController");


router.post("/subscribe", createSubscription);
router.get("/subscriptions/:userName", getSubscriptionsByUser);
router.put("/subscriptions/:id", updateSubscription);
router.delete("/subscriptions/:id", cancelSubscription);
router.get("/subscriptions/duration/6", (req, res) => getSixMonthSubscriptions(req, res));

router.get("/subscriptions/duration/6", getSixMonthSubscriptions);
module.exports = router;
