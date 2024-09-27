import express from "express";
import { authUser, getUserProfile, logoutUser, registerUser, updateUserProfile } from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";
import multer from "multer";
// import storage from "../services/fileUploadService.js";
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "./backend/uploads");
    },
    filename: function (req, file, callback) {
      callback(null, Date.now() + "-" + file.originalname);
    },
  });

const upload = multer({storage: storage })

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