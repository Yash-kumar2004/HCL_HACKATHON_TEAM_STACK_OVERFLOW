import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    const token = req.headers.token || req.headers.authorization?.split(" ")[1];
    
    if (!token) {
        return res.json({ success: false, message: 'Not Authorized. Login Again.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.id;   // ✔ Correct place

        next();

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export default authUser;
