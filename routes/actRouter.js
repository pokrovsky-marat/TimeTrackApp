const express = require("express");
const actController = require("../controllers/actController");
const authController = require("./../controllers/authController");

//GET access to passed params from 'tourRouter', we have to specify {mergeParams:true}
const router = express.Router({ mergeParams: true });
router.use(authController.protect);
router
  .route("/")
  .post(
    actController.addUserAndProjectToReqBody,
    actController.createAct
  )
  .get(actController.getActs);
router
  .route("/:id")
  .get(actController.getAct)
  .delete(
    actController.deleteAct
  )
  .patch(
    actController.updateAct
  ).put(actController.toggleAct)

module.exports = router;
