const router = require("express").Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require("../../controllers/userController");


// This route (/api/users),we can create new users and view all users.
router.route("/")
    .get(getUsers)
    .post(createUser);

// This route (/api/users/:userId),we can view,update,delete a user by its id
router.route("/:userId")
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// This route (/api/users/:userId/friends/:friendId),we can add  and delete users friend
router.route("/:userId/friends/:friendId")
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;