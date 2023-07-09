const asyncHandler = require("express-async-handler");
const blog = require("../models/blogModels");
const path = require("path");

const getHomePage = asyncHandler(async (req, res) => {
  const posts = await blog.find();

  res.render("index", {
    posts: posts,
  });
});

const getPersonalBlog = (req, res) => {
  res.render("create");
};

const getBlogPage = (req, res) => {
  res.render("about");
};

const contactPage = (req, res) => {
  res.render("contact");
};

const getParticularBlog = asyncHandler(async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const blogs = await blog.findById({ _id: req.params.id });
    res.render("post", {
      blog: blogs,
    });
  }
});

const createPersonalBlog = asyncHandler((req, res) => {
  let image = req.files.image;

  image.mv(
    path.resolve(__dirname, "../public/img", image.name),
    async (error) => {
      await blog.create({
        title: req.body.title,
        description: req.body.description,
        image: "/img/" + image.name,
      });
      res.redirect("/");
    }
  );
});

module.exports = {
  getHomePage,
  createPersonalBlog,
  getBlogPage,
  contactPage,
  getParticularBlog,
  getPersonalBlog,
};
