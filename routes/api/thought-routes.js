const router = require('express').Router();

// import routes from controllers
const {
    getAllThought,
    getThoughtById,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// GET all and POST at /api/thoughts
router.route('/').get(getAllThought).post(addThought)
    // api/thoughts/:userId
router.route('/:userId').post(addThought)

// GET one, PUT, and DELETE at /api/thoughts/:id
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);

// Post at /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// Delete reaction by id
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);


module.exports = router;