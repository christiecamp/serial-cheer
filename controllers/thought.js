const { Thought, User } = require('../models');

const thoughtController = {

    //all thoughts
    async getThoughts(req, res) {
        try{
            const thoughts = await Thought.find();
            return res.status(200).json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //thoughts by id
    //create thought
    //update thought
    //delete thought
    //add reaction
    //delete reaction
};

module.exports = thoughtController;