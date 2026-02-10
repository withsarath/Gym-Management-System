import Member from "../models/memberModel.js"
import Plan from "../models/planModel.js"
import Payment from "../models/paymentModel.js"
import Subscription from "../models/subscriptionModel.js"

export const makePayment = async (req, res) => {
    try {
        const { memberId, planId, method } = req.body;
        if (!memberId || !planId || !method) {
            return res.status(400).json({ message: "All fields are required"})
        }

        const member = await Member.findById(memberId);
        if (!member) {
            return res.status(404).json({ message: "Member not found!" })
        }

        const plan = await Plan.findById(planId);
        if (!plan) {
            return res.status(404).json({ message: "Plan not found!" })
        }

        const payment = new Payment({
            member: memberId,
            plan: planId,
            amount: plan.price, method,
            status: "paid"
        });

        await payment.save();

        let subscription = await Subscription.findOne({ member: memberId });
        if (!subscription) {
            subscription = new Subscription({
                member: memberId,
                plan: planId,
                startDate: new Date(),
                endDate: new Date(Date.now() + plan.duration * 24 * 60 * 60 * 1000),
                status: "active",
                createdBy: req.user.id
            })
            await subscription.save();
        }
        res.status(201).json({
            message: "Payment successful",
            payment,
            subscription
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}
export const getPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate("member").populate("plan").sort({ createdAt: -1 });
        res.status(200).json(payments);

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}
export const memberPayments = async (req, res) => {
    try {
        const { id } = req.params
        const member = await Member.findById(id);
        if (!member) {
            return res.status(404).json({ message: "Member not found" })
        }
        const payments = await Payment.find({ member: id })
            .populate("member")
            .populate("plan")
            .sort({ createdAt: -1 });
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}