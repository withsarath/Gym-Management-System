import Plan from "../models/planModel.js"

export const getAllPlans = async (req, res) => {
    try {
        const plans = await Plan.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json(plans);
    } catch (error) {
        res.status(500).json({ message: "Internal server error!!", error })
    }
}
export const getPlan = async (req, res) => {
    try {
        const {id} = req.params;
        const plan = await Plan.findById(id);
        if(!plan) {
            return res.status(404).json({message: "Not Found"})
        }
        res.status(200).json(plan)

    } catch (error) {
        res.status(500).json({ message: "Internal server error!!", error })
    }
}
export const createPlan = async (req, res) => {
    try {
        const { name, price, duration } = req.body;
        if (!name || !price || !duration) {
            return res.status(400).json({ message: "All fields are required!!" })
        }
        const plan = new Plan({
            name,
            price,
            duration,
            createdBy: req.user.id // * created by admin
        })
        await plan.save();
        res.status(201).json(plan);
    } catch (error) {
        res.status(500).json({ message: "Internal server error!!", error })
    }
}
export const updatePlan = async (req, res) => {
    try {
        const {name, price, duration} =  req.body
        const updatedPlan = await Plan.findByIdAndUpdate(req.params.id,{
            name,
            price,
            duration
        }, {new: true})

        if(!updatedPlan) {
            return res.status(400).json({message: "no plan found!"})
        }
        res.status(200).json(updatedPlan)
    } catch (error) {
        res.status(500).json({ message: "Internal server error!!", error })
    }
}