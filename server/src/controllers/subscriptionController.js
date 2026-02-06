import Member from "../models/memberModel.js";
import Plan from "../models/planModel.js"
import Subscription from "../models/subscriptionModel";

export const assignPlan = async (req, res) => {
    try {
        const { memberId, planId } = req.body;
        if (!memberId || !planId) {
            return res.status(400).json({ message: "All fields are required" })
        }
        // * checking the member exists
        const member = await Member.findById(memberId);
        if (!member) return res.status(404).json({ message: "Member not found" });

        // * checking the plan exists
        const plan = await Plan.findById(planId);
        if (!plan) {
            return res.status(404).json({ message: "Plan Not Found" })
        }
        const subscription = new Subscription({
            member,
            plan,
            createdBy: req.user.id
        })
        await subscription.save();
        res.json(subscription)

    } catch (error) {
        res.status(500).json({ message: "Internal server error!", error });
    }
}
export const memberSubscription = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Internal server error!" });
    }
}
export const pausePlan = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Internal server error!" });
    }
}
export const resumePlan = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Internal server error!" });
    }
}
export const cancelPlan = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Internal server error!" });
    }
}