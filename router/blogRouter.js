const express = require("express");
const router = express.Router();

const {
  getHomePage,
  createPersonalBlog,
  getBlogPage,
  contactPage,
  getParticularBlog,
  getPersonalBlog,
} = require("../controller/blogController");

router.get("/", getHomePage);
router.get("/createblog", getPersonalBlog);
router.get("/about", getBlogPage);

router.get("/contact", contactPage);

router.get("/:id", getParticularBlog);

router.post("/posts/store", createPersonalBlog);

module.exports = router;
