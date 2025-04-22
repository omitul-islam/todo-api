import userModel from "../auth/auth.model.js"


export const getProfileService = async(userId)=> {
    return await userModel.findById(userId).select('-password');
}

export const updateProfileService = async(user) => {
    return await user.save();
}

export const deleteProfileService = async(userId) => {
    return await userModel.findByIdAndDelete(userId);
}