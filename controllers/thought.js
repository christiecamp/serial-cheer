const { Thought, User } = require('../models');

const thoughtController = {

    //all thoughts
    async getThoughts(req, res) {
        try{
            const thoughts = await Thought.find()
                // .populate({ path: 'reactions', select: '-__v' });
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
                { _id: req.params.id },
                { $push: { thoughts: thought._id } },
                //$addToSet
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
        try {
            const thought = await Thought.findByIdAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'id not found '});
            }
            return res.status(200).json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //delete thought & associated reactions
    async deleteThought(req, res) {
        try {
            //thought
            const thought = await Thought.findByIdAndDelete({ _id: req.params.id });
            if (!thought) {
                return res.status(404).json({ message: 'id not found' });
            }
            //remove thought from user
            const user = await User.findByIdAndUpdate(
                { thoughts: req.params.id },
                { $pull: { thoughts: req.params.id } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'thought created but user not found' });
            }
            res.status(200).json({ message: 'thought deleted!' });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //add reaction
    async addReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                { _id: req.params.thoughtId },
                { $addtoSet: { reactions: body } },
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'thought not found' });
            }
            return res.status(200).json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //delete reaction
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: req.params.reactionId } },
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'no thought  found'})
            }
            return res.status(200).json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
};

module.exports = thoughtController;