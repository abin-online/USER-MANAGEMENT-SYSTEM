import express from "express";
import { isAdmin, protect } from "../middleware/authMiddleware.js";
import { createUser, deleteUser, editUser, getUsers } from "../controllers/adminControllers.js";

const router = express.Router();

router
    .route('/users')
    .post(protect , isAdmin , createUser )
    .get(protect , isAdmin , getUsers);

router
    .route('/users/:id')
    .put(protect , isAdmin , editUser)
    .delete(protect , isAdmin , deleteUser)

export default router