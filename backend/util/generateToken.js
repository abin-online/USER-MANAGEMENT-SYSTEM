import jwt from 'jsonwebtoken';
const tokenSecret = process.env.JWT_SECRET;

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, `${tokenSecret}`, {
        expiresIn: "30d",
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });
};

export default generateToken