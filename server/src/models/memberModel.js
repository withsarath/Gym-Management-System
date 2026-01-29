import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    joinDate:{
        type: Date,
        default: Date.now()
    },
    status:{
        enum: ["active", "inactive", "paused"],
        default: "active"
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

})

const Member = mongoose.model("Member", memberSchema);
export default Member;