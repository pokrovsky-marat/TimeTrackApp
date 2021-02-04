const express = require("express");
const projectController = require("../controllers/projectController");
const authController = require("./../controllers/authController");
const actRouter = require("./actRouter");

const router = express.Router();
//To avoid duplicating code, passed work with 'reviews' to 'actRouter'
router.use("/:projectId/reviews", actRouter);

router
  .route("/")
  .get(projectController.getProjects)
  .post(
    authController.protect,
    projectController.addUserToReqBody,
    projectController.createProject
  );
router
  .route("/:id")
  .patch(authController.protect, projectController.updateProject)
  .delete(
    authController.protect,
    projectController.deleteAllActionsForThisProject,
    projectController.deleteProject
  )
  .get(projectController.getProject);

module.exports = router;
