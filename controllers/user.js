const { User, Thought } = require('../models');

const userController = {

    //all users
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

    //user by id
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
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
        return res.status(200).json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //update user
    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'user not found'});
            }
            return res.status(200).json(user);
        } catch(err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //delete user & associated thoughts
    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete({ _id: req.params.id});
            if (!user) {
                return res.status(404).json({ message: 'user not found' });
            }
            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            return res.satus(200).json({ message: 'user & associated thoughts/reactions deleted' });
        } catch(err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //add friend
    async addFriend(req, res) {
        try {
            const friend = await User.findByIdAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );
            if (!friend) {
                return res.status(404).json({ message: 'user not found' });
            }
            return res.status(200).json(friend);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //delete friend
    async deleteFriend(req, res) {
        try {
            const friend = await User.findByIdAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );
            if (!friend) {
                return res.status(404).json({ message: 'user not found' });
            }
            return res.status(200).json(friend);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
};

module.exports = userController;
