import e from "express";
import User from "../models/userSchema.js";
import { matchPassword } from "../services/passwordService.js";
import generateToken from "../util/generateToken.js";

const authUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await matchPassword(password, user.password))) {
            generateToken(res, user._id);

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                image: user.imageURL,
                isAdmin: user.isAdmin,
            })
        } else {
            throw new Error('Invalid email or password')
        }
    } catch (error) {
        res.status(401).send({ error: "Invalid credentials" });
        console.log(error);
    }
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }

        const user = await User.create({
            name,
            email,
            password,
            image: ""
        })

        if (user) {
            generateToken(res, user._id);
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                image: user.image,
            })
        } else {
            res.status(400);
            throw new Error('Invalid credentials')
        }

    } catch (error) {
        console.log(error);
    }
}

const logoutUser = async (req, res) => {
    try {
        res.cookie("jwt", "", {
            httpOnly: true,
            expires: new Date(0),
        });
        res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        console.log(error)
    }
}

const getUserProfile = async (req, res) => {
    try {
        if (req.user) {
            res.json({
                _id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                image: req.user.image,
            })
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        console.log(error);
    }
}

const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.imageURL = req.body.imageURL || user.imageURL;

            if (req.body.password) {
                user.password = req.body.password;
            }

            const updateUser = await user.save();

            res.json({
                _id: updateUser._id,
                name: updateUser.name,
                image: updateUser.imageURL,
                email: updateUser.email,
            });
        } else {
            res.status(404);
            throw new Error('User not found')
        }
    } catch (error) {
        console.log(error)
    }
}

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}