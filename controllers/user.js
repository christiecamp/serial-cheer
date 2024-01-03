const { User, Thought } = require('../models');

const userController = {

    //GET all users
    async getUsers(req, res) {
        try {
            const users = await User.find()
                // .populate({ path: 'thoughts', select: '-__v' })
                .populate({ path: 'friends', select: '-__v' });
            return res.status(200).json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //GET user by id
    async getUserById(req, res) {
        try {
            const user = await User.findById({ _id: req.params.id })
                .populate({ path: 'thoughts', select: '-__v' })
                .populate({ path: 'friends', select: '-__v' });
            if (!user) {
                return res.status(404).json({ message: 'id not found' })
            }
            return res.status(200).json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
//create user
//update user
//delete user
//add friend
//delete friend

};

module.exports = userController;
