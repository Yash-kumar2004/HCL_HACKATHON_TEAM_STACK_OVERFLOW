import jwt from 'jsonwebtoken'

const authProvider = async (req, res, next) => {
    const token = req.headers.ptoken || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized. Login Again.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.providerId = decoded.id;   // ✔ Correct
        next();

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export default authProvider;
