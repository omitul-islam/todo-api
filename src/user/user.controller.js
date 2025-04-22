import { deleteProfileService, getProfileService, updateProfileService } from "./user.service.js";

export const getProfile = async(req, res, next) => {
    try {
        console.log(req.user.id);
        const user = await getProfileService(req.user.id);
        return res.status(200).json({message: "User profile fetched successfully!", user});
    } catch (error) {
        next(error);
    }
}

export const updateProfile = async(req, res, next) => {
      try {
        const userId = req.user.id;
        const {username, email} = req.body;
        const user = await getProfileService(userId);
        if(!user) {
            return res.status(404).json({message:"user not found!"});
        }
        if(username !== undefined) {
            user.username = username;
        }
        if(email !== undefined) {
            user.email = email;
        }
        const updatedUser = await updateProfileService(user);
        return res.status(200).json({message: "User updated successfully!", updatedUser}); 
      } catch (error) {
        next(error);
      }
}

export const deleteProflie = async(req, res, next) => {
      try {
        const userId = req.user.id;
        const user = await deleteProfileService(userId);
        if(!user) {
            return res.status(404).json({message:"user not found!"});
        }
        return res.status(200).json({message: "User deleted successfully!", user});

      } catch (error) {
        next(error);
      }
}