import User from "../models/userSchema.js";

const getUsers = async(req, res)=> {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        console.log(error)
    }
}

const createUser = async (req, res)=> {
    try {
        const { name , email , password } = req.body;

        const userExists = await User.findOne({email});
        if(userExists) {
            res.status(400);
            throw new Error('User already exists');
        }

        const user = await User.create({ name , email , password});
        if(user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    } catch (error) {
        console.log(error);
    }
}

const editUser = async (req, res)=> {
    try {
        const id = req.params.id;
        const { name, email } = req.body;

        const user = await User.findById(id);

        if(user) {
            user.name = name || user.name;
            user.email = email || user.email

            const updateUser = await User.save();
            res.status(200).json({
                _id: updateUser._id,
                name: updateUser.name,
                email: updateUser.email
            });
        }else {
            res.status(404);
            throw new Error('user not found');
        }
    } catch (error) {
        console.log(error)
    }
}

const deleteUser = async (req, res)=> {
    try {
        const {id} = req.params;

        const user = await User.findByIdAndDelete(id);
        if(user) {
            return res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
            })
        } else {
            res.status(404);
            throw new Error('User not found')
        }
    } catch (error) {
        console.log(error)
    }
}

export {
    getUsers,
    createUser,
    editUser,
    deleteUser
}