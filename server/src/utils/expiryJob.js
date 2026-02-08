import cron from "node-cron";
import Subscription from "../models/subscriptionModel.js"

const startExpiryJob = () => {
    cron.schedule("0 0 * * *", async () => {
        //* Runs every day at 12 AM
        console.log("Running expiry job...");

        try {
            const today = new Date();

            const result = await Subscription.updateMany(
                {
                    endDate: { $lt: today },
                    status: { $ne: "expired" }
                },
                {
                    status: "expired"
                }
            )
            console.log("Expired subscriptions updated:", result.modifiedCount);
        } catch (error) {
            console.error("Expiry job error:", error);
        }
    })
}
export default startExpiryJob;