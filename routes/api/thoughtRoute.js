const router = require("express").Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require("../../controllers/thoughtController");

// This route (/api/thoughts), we can create new thoughts and view all thoughts
router.route("/")
    .get(getThoughts)
    .post(createThought);

// This route (/api/thoughts/:thoughtId),we can view,update,delete a thought by its id
router.route("/:thoughtId")
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// This route (/api/:thoughtId/reactions),we can add a reaction to the thought
router.route("/:thoughtId/reactions")
    .post(addReaction);

// This route (/api/:thoughtId/reactions/:reactionId),we can delete a reaction to the thought
router.route("/:thoughtId/reactions/:reactionId")
    .delete(deleteReaction);

module.exports = router;