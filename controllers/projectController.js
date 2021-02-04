const cathAsyncErrors = require("./../utils/cathAsyncErrors");
const AppError = require("../utils/AppError");
const Project = require("../models/projectModel");
const Act = require("../models/actModel");
const factory = require("./handlerFactory");

exports.getProjects = factory.getAll(Project);
exports.getProject = factory.getOne(Project, {
  path: "reviews",
});
exports.createProject = factory.createOne(Project);
exports.updateProject = factory.updateOne(Project);

exports.addUserToReqBody = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user._id;
  next();
};
exports.deleteProject = factory.deleteOne(Project);

exports.deleteAllActionsForThisProject = cathAsyncErrors(
  async (req, res, next) => {
    let doc = await Act.deleteMany({ project: req.params.id });
    console.log("============================");
    console.log(doc);
    if (!doc) {
      return next(
        new AppError(`No project found with such ID <${req.params.id}>`, 404)
      );
    }
    next();
  }
);
