const { Thought, User } = require('../models');

const thoughtController = {

    //all thoughts
    async getThoughts(req, res) {
        try{
            const thoughts = await Thought.find()
                .populate({ path: 'reactions', select: '-__v' });
            return res.status(200).json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //thoughts by id
    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findById({ _id: req.params.id
            })
            .populate({ path: 'reactions', select: '-__v' });
            if (!thought) {
                return res.status(404).json({ message: 'id not found' })
            }
            return res.status(200).json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //create thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findByIdAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { thoughts: thought._id } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'thought created but user not found' });
            }
            //update as soon as code is polished
            res.status(200);
            res.json(thought);
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //update thought
    async updateThought(req, res) {

    },

    //delete thought
    async deleteThought(req, res) {

    },

    //add reaction
    async addReaction(req, res) {

    },

    //delete reaction
    async deleteReaction(req, res) {

    },
};

module.exports = thoughtController;