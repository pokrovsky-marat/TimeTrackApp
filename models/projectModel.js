const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A project must have a name"],
      trim: true,
      maxLength: [
        50,
        "A tour must have a name less or equal than 50 characters",
      ],
    },
    duration: { type: Number, default: 0 },
    description: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now() },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A project must have a Creator"],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

/*projectSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});*/

const Project = new mongoose.model("Project", projectSchema);
module.exports = Project;
