const { User, Thought } = require("../models");

module.exports = {
 
// Function to get all of the thoughts by invoking the find() method with no arguments.
// Then return the results as JSON, and catch any errors.
// Errors are sent as JSON with a message and a 500 status code.
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
  // Gets a single thought.Pass in the ID of the thought and then respond with it, or an error if not found
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select("-__v")
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: `No thought found with this ID` })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
// Creates a new thought. Accepts a request body with the entire Thought object.
// Because thoughts are associated with Users, then  update the User who created the thought 
//And add the ID of the  thought  to the  thoughts array
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: `Thought created ,but no user found with that ID  `})
                    : res.json(`created the thought`)
            )
            .catch((err) => res.status(500).json(err));
    },
   // Updates thoughts using the findOneAndUpdate method and the ID
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true }
        )
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: `No thought with this id!` })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
  // Deletes a thought from the database. Looks for a thought by ID.
// Then if the thought  exists,then look for any users associated with the thought based on the thought ID 
// And update the thoughts array for the User.
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: `No thought with this id!` })
                    : User.findOneAndUpdate(
                        { ThoughtId: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughId } },
                        { new: true }
                    )
            )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: `Thought created but no user found with this id!` })
                    : res.json({ message: `Thought successfully deleted!` })
            )
            .catch((err) => res.status(500).json(err));
    },
  
      // Adds a reaction to a thought.
      // This method is unique in that we can  add the entire body of the reaction  rather than the ID with the mongodb $addToSet operator.
    addReaction(req,res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
        )
        .then((thought) => 
            !thought
                ? res.status(404).json({ message: `No thought with this id!` })
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Delete reaction to a thought. 
    //This method finds the thought based on ID. It then updates the reactions array associated with the thought in question by deleting it's reactionId from the reactions array.
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { new: true } 
        )
        .then((thought) => 
            !thought
                ? res.status(404).json({ message: `No thought with this id!` })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    }
};

