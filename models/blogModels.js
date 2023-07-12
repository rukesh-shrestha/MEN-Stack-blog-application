const mongoose = require("mongoose");

const blog = mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    title: {
      type: String,
      required: [true, "Enter the blog titile"],
    },
    subheading: {
      type: String,
      required: [true, "Enter your blog sub-heading"],
    },
    description: {
      type: String,
      required: [true, "Enter your blog description"],
    },
    date: {
      type: Date,
      default: new Date().toUTCString(),
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("blog", blog);
