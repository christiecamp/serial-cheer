const router = require('express').Router();
//thought controller
const{
    getThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require('../../controllers/thought');

//api/thoughts
router.route('/')
.get(getThoughts)
.post(createThought);

//api/thoughts/:id
router.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

//api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
.post(addReaction);

//api/thoughts/:thoughtId/reactions/reactionId
router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;