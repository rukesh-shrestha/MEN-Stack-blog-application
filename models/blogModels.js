const mongoose = require("mongoose");
const blog = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Enter the blog titile"],
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
