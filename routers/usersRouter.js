const router = require("express").Router();
const userController = require("../Controllers/userController");
const { verifyToken } = require("../Controllers/authController");

router.get("/", userController.getAllUsers);
router.get("/:id", verifyToken, userController.getSingleUser);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
