import Member from "../models/memberModel.js"
export const getAllMembers = async (req, res) => {
    try {
        const members = await Member.find().sort({ createdAt: -1 })
        res.status(200).json(members);
    } catch (error) {
        console.log("Error in getting all the members", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const createMember = async (req, res) => {
    try {
        const { name, phoneNumber, email, joinDate } = req.body;
        if (!name || !phoneNumber || !email || !joinDate) {
            return res.status(400).json({ message: "You need to fill all the required fields!" })
        }
        const member = new Member({ name, phoneNumber, email, joinDate , createdBy: req.user.id});
        await member.save();
        res.status(201).json(member);
    } catch (error) {
        console.log("Error in creating the member", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const getMember = async (req, res) => {
    try {
        const { id } = req.params
        const member = await Member.findById(id);
        if (!member) return res.status(404).json({ message: "Member not found" });
        res.json(member);
    } catch (error) {
        console.log("Error in getting the member", error);
        res.status(500).json({ message: "Internal server error" });
    }

}
export const updateMember = async (req, res) => {
    try {
        const { name, phoneNumber, email, joinDate } = req.body;
        const updatedMember = await Member.findByIdAndUpdate(req.params.id, {
            name, phoneNumber, email, joinDate
        }, { new: true })
        if (!updatedMember) return res.status(404).json({ message: "No member found!!" });
        res.status(200).json(updatedMember)
    } catch (error) {
        console.log("Error in updating the member", error);
        res.status(500).json({ message: "Internal server error" });
    }

}