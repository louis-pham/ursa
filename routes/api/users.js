const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/users");

/*---------- Public Routes ----------*/
router.post("/signup", usersCtrl.signup);
router.post("/login", usersCtrl.login);

/*---------- Protected Routes ----------*/
router.use(require('../../config/auth'));
router.get("/users", usersCtrl.getAllUsers);
router.get("/users/:username", usersCtrl.get);
router.put("/update", usersCtrl.update);
router.delete("/delete", usersCtrl.deleteUser);

module.exports = router;
