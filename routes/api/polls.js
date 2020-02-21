const express = require("express");
const router = express.Router();
const pollsCtrl = require("../../controllers/polls");

/*---------- Public Routes ----------*/

/*---------- Protected Routes ----------*/
router.use(require('../../config/auth'));
router.post("/create", pollsCtrl.create);
router.get("/polls", pollsCtrl.getAllPolls);
router.get("/polls/:id", pollsCtrl.get);
router.put("/polls/:id/update", pollsCtrl.update);
router.put("/polls/:id/:choiceId", pollsCtrl.castVote);
router.delete("/polls/:id/delete", pollsCtrl.deletePoll);

module.exports = router;
