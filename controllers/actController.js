const Act = require("../models/actModel");
const factory = require("./handlerFactory");
const cathAsyncErrors = require("./../utils/cathAsyncErrors");
const AppError = require("../utils/AppError");

exports.getActs = factory.getAll(Act);
exports.updateAct = factory.updateOne(Act);
exports.deleteAct = factory.deleteOne(Act);
exports.getAct = factory.getOne(Act);
exports.addUserAndProjectToReqBody = (req, res, next) => {
    if (!req.body.project) req.body.project = req.params.projectId;
    if (!req.body.user) req.body.user = req.user._id;
    next();
};
exports.createAct = factory.createOne(Act);

exports.toggleAct = cathAsyncErrors(async (req, res, next) => {
    if (req.body.started) {
        let doc = await Act.findByIdAndUpdate(req.params.id, {start: Date.now()}, {
            new: true,
            runValidators: true,
        });
        if (!doc) {
            return next(
                new AppError(`No document found with such ID <${req.params.id}>`, 404)
            );
        }
        res.status(200).json({status: "success", data: {doc}});
    } else {
        let doc = await Act.findById(req.params.id);
        if (!doc) {
            return next(
                new AppError(`No document found with such ID <${req.params.id}>`, 404)
            );
        }
        doc.activityTime.push({started: doc.start, finished: Date.now()})
        doc.start = null
        await doc.save()
        res.status(200).json({status: "success", data: {doc}});
    }
});