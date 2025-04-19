import Subscriptions from "../Model/subscriptions.model.js";
import User from "../Model/user.model.js";

export const addSubscription = async (req, res) => {
    const { name, frequency, category, cost, nextPaymentDate } = req.body;

    try {
        if (!name && !frequency && !category && !cost && !nextPaymentDate) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const data = new Subscriptions({
            name,
            category,
            cost,
            frequency,
            nextPaymentDate,
            user: req.user._id,
        });

        await data.save();
        res.status(200).json(data);
    }
    catch (error) {
        console.log("Error in addSubscription controller:", error);
        res.status(400).json({ message: "Internal server error" });
    }
};

export const getSubscriptions = async (req, res) => {
    const user = req.user._id;

    try {
        const subscriptions = await Subscriptions.find({ user });
        res.status(200).json(subscriptions);
    }
    catch (error) {
        console.log("Error in getSubscription controller:", error);
        res.status(400).json({ message: "Internal server error" });
    }
};

export const updateSubscriptions = async (req, res) => {
    try {
        const updatedData = await Subscriptions.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedData);
    }
    catch (error) {
        console.log("Error in UpdateSubscriptions controller:", error);
        res.status(400).json({ message: "Internal server error" });
    }
};


export const deleteSubscription = async (req, res) => {
    try {
        await Subscriptions.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Subscription is successfully deleted" });
    }
    catch (error) {
        console.log("Error in deleteSubscriptions controller:", error);
        res.status(400).json({ message: "Internal server error" });
    }
};