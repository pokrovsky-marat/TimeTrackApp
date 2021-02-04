const express = require("express");
const viewsController = require("../controllers/viewsController");
const authController = require("./../controllers/authController");

const router = express.Router();
router.use(authController.addUserToTemplate);

router.route("/").get(viewsController.renderHome);
router.route("/login").get(viewsController.renderLogin);
router.route("/signup").get(viewsController.renderSignup);
router
  .route("/projects")
  .get(authController.protect, viewsController.renderProjects);
  
router
  .route("/acts/:id")
  .get(authController.protect, viewsController.renderActs);

router.route("/logout").get(authController.protect, authController.logout);
router.route("/statistics/:id").get(viewsController.renderStatistics);
module.exports = router;
