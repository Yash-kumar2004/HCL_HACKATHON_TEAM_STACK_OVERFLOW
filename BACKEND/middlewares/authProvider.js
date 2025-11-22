import jwt from 'jsonwebtoken'

// tutor authentication middleware
const authProvider = async (req, res, next) => {
    const { ptoken } = req.headers
    if (!ptoken) {
        return res.json({ success: false, message: 'Not Authorized Login Again' })
    }
    try {
        const token_decode = jwt.verify(ptoken, process.env.JWT_SECRET)
        req.body.tutid = token_decode.id
        next()
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
export default authProvider;