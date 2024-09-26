import express from "express";
import { authUser, getUserProfile, logoutUser, registerUser, updateUserProfile } from "../controllers/userControllers.js";
import upload from "../services/fileUploadService.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post('/', registerUser);
router.post('/auth' , authUser);
router.post('/logout' , logoutUser);

router.post('/upload' , upload?.single("avatar") , (req, res)=> {
    res.send(req.file.path.substring(16))
} )

router
    .route('/profile')
    .get(protect , getUserProfile)
    .put(protect , updateUserProfile);

export default router