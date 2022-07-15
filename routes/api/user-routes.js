const router = require('express').Router();

const {
    getAllUser,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

//  GET all and POST at /api/users
router.route('/').get(getAllUser).post(addUser);

// GET one, PUT, and DELETE at /api/users/:id
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

// POST to add a new friend to a user's friend list, DELETE to remove a friend from a user's friend lis
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;