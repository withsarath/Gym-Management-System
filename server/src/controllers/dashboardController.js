import Member from "../models/memberModel.js";
import Subscription from "../models/subscriptionModel.js";
import Payment from "../models/paymentModel.js";
import Plan from "../models/planModel.js";

export const getDashboardStats = async (req, res) => {
  try {

    // * Total Members
    const totalMembers = await Member.countDocuments();

    // * Active Subscriptions
    const activeSubscriptions = await Subscription.countDocuments({
      status: "active",
    });

    // * Expired Subscriptions
    const expiredSubscriptions = await Subscription.countDocuments({
      status: "expired",
    });

    // * Total Plans
    const totalPlans = await Plan.countDocuments();

    // * Total Revenue
    const revenue = await Payment.aggregate([
      {
        $match: { status: "paid" },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amount" },
        },
      },
    ]);

    const totalRevenue = revenue[0]?.totalRevenue || 0;

    res.status(200).json({
      totalMembers,
      totalPlans,
      activeSubscriptions,
      expiredSubscriptions,
      totalRevenue,
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

