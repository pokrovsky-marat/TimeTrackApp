const Project = require("../models/projectModel");
const Act = require("../models/actModel");
const factory = require("./handlerFactory");
const cathAsyncErrors = require("./../utils/cathAsyncErrors");
const AppError = require("../utils/AppError");

exports.renderHome = factory.renderOne("home");
exports.renderLogin = factory.renderOne("login");
exports.renderSignup = factory.renderOne("signup");
exports.renderProjects = cathAsyncErrors(async (req, res, next) => {
  let projects = await Project.find({ user: req.user._id });
  res.render("projects", { projects });
});

exports.renderActs = cathAsyncErrors(async (req, res, next) => {
  let project = await Project.findOne({ _id: req.params.id });
  let acts = await Act.find({ project: req.params.id });
  res.render("acts", { acts, project });
});
exports.renderStatistics = cathAsyncErrors(async (req, res, next) => {
  let project = await Project.findOne({ _id: req.params.id });
  let acts = await Act.find({ project: req.params.id });
  res.render("statistics", { acts, project });
});
