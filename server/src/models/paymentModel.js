import mongoose from "mongoose"

const paymentSchema = new mongoose.Schema({
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
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ["paid", "failed"],
        default: "paid"
    },
    method: {
        type: String,
        enum: ["upi", "card", "cash"],
        requried: true
    },
}, { timestamps: true })

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;