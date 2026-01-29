import Member from "../models/memberModel.js"
export const getAllMembers = async (req, res) => {
    try {
        const member = await Member.find().sort({ createdAt: -1 })
        res.status(200).json(member);
    } catch (error) {
        console.log("Error in getting all the members", error);
    }
}
export const createMembers = async (req, res) => {
    try {
        const { name, phoneNumber, email, joinDate } = req.body;
        if (!name | !phoneNumber | !email | !joinDate) {
            return res.status(404).json({ message: "You need to fill all the required fields!" })
        }
        const member = new Member({name, phoneNumber, email, joinDate});
        res.status(201).json(member);
    } catch (error) {
        console.log("Error in getting the member", error);
    }
}
export const getMember = async (req, res) => {

}
export const updateMembers = async (req, res) => {

}
