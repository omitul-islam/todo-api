import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
    }, 
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
},{ timestamps: true,});

const userModel = model("User", userSchema);
export default userModel;