import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
        required: true
    },
    plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plan",
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now(),
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        enum: ["active", "expired", "paused", "cancelled"],
        default: "active"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
},{timestamps: true});


const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;