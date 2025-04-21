const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },

    comments: [commentSchema],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

postSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Post", postSchema);
