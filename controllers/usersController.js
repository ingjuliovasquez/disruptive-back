const User = require("../models/User")

module.exports.getUser = async (req, res) => {
    const id = req.params.id;
    try {

        const user = await User.findById(id)
        if (!user) {
            return res.status(402).json({error: "User not found!"})
        }
        return res.json(user)
    }
    catch (error) {
        req.status(501).json(error)
    }

}