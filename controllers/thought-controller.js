const { User, Thought } = require('../models');

// create api/thoughts
const thoughtController = {
    // get all thoughts
    getAllThought(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            // .sort({_id: -1})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                res.status(500).json(err);
            });
    },

    // get single thought by _id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            // .sort({_id:-1})
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thoughts found with that id' });
                    return;
                }
                res.json(dbThoughtData);

            }).catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
    addThought({ body }, res) {
        Thought.create(body)
            .then((dbThoughtData) => {
                return User.findOneAndUpdate({ _id: body.userId }, { $push: { thoughts: dbThoughtData._id } }, { new: true });
            }).then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'Wrong thought data' });
                    return;
                }
                res.json(dbThoughtData)
            }).catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // update thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id },
                body, { new: true, runValidators: true }
            ).then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thoughts found with that id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // delete thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thoughts found with that id!' });
                    return;
                }
                //     return User.findOneAndUpdate(
                //         { _id: params.userId },
                //         { $pull: { thoughts: params.Id } },
                //         { new: true }
                //     )
                // }).then(dbUserData => {
                //     if (!dbUserData) {
                //       res.status(404).json({ message: 'No User found with this id!' });
                //       return;
                // }
                res.json(dbThoughtData);
            }).catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    //create reactions
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, { $push: { reactions: body } }, { new: true, runValidators: true })
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'Incorrect reaction data!' });
                    return;
                }
                res.json(dbThoughtData);
            }).catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Delete a reaction
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, { $pull: { reactions: { reactionId: params.reactionId } } }, { new: true }).then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No reaction found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
};

module.exports = thoughtController