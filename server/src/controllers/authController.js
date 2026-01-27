import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
    try {
        const { username, password, role } = req.body
        
        const hashedPassword = await bcrypt.hash(password, 10);

        // * Add new user into the database..
        const newUser = new User({ username, password: hashedPassword, role })
        await newUser.save();
        return res.status(201).json({ message: `New user is created as ${username}` })
    } catch (error) {
        res.status(500).json({ message: "Server error in Register", error })
    }

}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: `User with this username ${username} is not found!!` })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invald credentionals" })
        }
        const token = jwt.sign({ id: user._id, role: user.role, }, process.env.JWT_SECRET, { expiresIn: "5h" });

        res.status(200).json({token});

    } catch (error) {
        res.status(500).json({ message: "Server error in login", error })
    }
}