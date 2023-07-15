const express = require("express");
const router = express.Router();

const {
  getHomePage,
  createPersonalBlog,
  getBlogPage,
  contactPage,
  getParticularBlog,
  getPersonalBlog,
  receiveDataContactPage,
} = require("../controller/blogController");

const includeSessionId = require("../middleware/userInSession");

const authMiddleWare = require("../middleware/authMiddleware");
router.get("/", getHomePage);
router.get("/createblog", authMiddleWare, getPersonalBlog);
router.get("/about", getBlogPage);

router.get("/contact", contactPage);

router.get("/:id", getParticularBlog);

router.post("/posts/store", createPersonalBlog);
router.post("/confirm/contact", receiveDataContactPage);
// router.use((req, res) => res.render("notfound"));
module.exports = router;
