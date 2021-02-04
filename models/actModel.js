const mongoose = require("mongoose");

const actSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "A act must have a name"],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        createdAt: {type: Date, default: Date.now()},

        project: {
            type: mongoose.Schema.ObjectId,
            ref: "Project",
            required: [true, "A act must have a Project"],
        },
        activityTime: [{started: Number, finished: Number}],
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: [true, "A act must have an User"],
        },
        start: {
            type: Number,
            default: null
        }
    },
    {toJSON: {virtuals: true}, toObject: {virtuals: true}}
);
actSchema.virtual("duration").get(function () {
    let sum = 0;
    this.activityTime.forEach(({finished, started}) => sum += (finished - started))
    return sum;
});

actSchema.pre(/^find/, function (next) {
    this.populate({
        // path: "tour user",
        path: "user", //To avoid nesting when populating tour>reviews, don't populate <tour>
        // select: "-__v",
        select: " name email ",
    });
    next();
});


const Act = new mongoose.model("Act", actSchema);
module.exports = Act;
