import mongoose from "mongoose";

//This is subscriptions model
const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    frequency: {
        type: String,
        enum: ['Monthly', 'Yearly'],
        required: true
    },
    nextPaymentDate: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true });

const subscriptionsModel = mongoose.model("subscriptions", subscriptionSchema);

export default subscriptionsModel;
