const asyncHandler = require("express-async-handler");
const blog = require("../models/blogModels");
const path = require("path");
const nodemailer = require("nodemailer");
const flash = require("connect-flash");

const getHomePage = asyncHandler(async (req, res) => {
  const posts = await blog.find().populate("userid");
  console.log(posts.userid);
  res.render("index", {
    posts: posts,
  });
});

const getPersonalBlog = (req, res) => {
  res.render("create", {
    createPost: true,
  });
};

const getBlogPage = (req, res) => {
  res.render("about");
};

const contactPage = (req, res) => {
  const message = req.flash("message");
  const messageerror = req.flash("messageerror");

  res.render("contact", { messageerror: messageerror, message: message });
};

const receiveDataContactPage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const transporter = nodemailer.createTransport({
      port: 465,
      host: process.env.EMAIL_HOST,
      auth: {
        user: process.env.EMAIL_AUTH_USER,
        pass: process.env.EMAIL_AUTH_PASS,
      },
      secure: true,
    });
    const mailData = {
      from: email,
      to: "rukesh.shrestha11@gmail.com",
      subject: `From ${name}`,
      text: `Hello Rukesh, You got a mail from ${name}. His email address is ${email}. \n \n ${message}`,
    };
    await transporter.sendMail(mailData, (error, info) => {
      if (error) {
        req.flash("messageerror", "Server Error Cannot Send Message.");
        res.redirect("/contact");
        // throw new Error("Cannot Send Message");
      } else {
        req.flash("message", "Message Send Successfully.");
        res.redirect("/contact");
      }
    });
  } catch (error) {
    res.redirect("/contact");
  }
};

const getParticularBlog = asyncHandler(async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const blogs = await blog
      .findById({ _id: req.params.id })
      .populate("userid");
    res.render("post", {
      blog: blogs,
    });
  }
});

const createPersonalBlog = asyncHandler((req, res) => {
  let image = req.files.image;
  console.log(req.session);

  image.mv(
    path.resolve(__dirname, "../public/img", image.name),
    async (error) => {
      await blog.create({
        userid: req.session.userId,
        title: req.body.title,
        subheading: req.body.subheading,
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
  receiveDataContactPage,
};
