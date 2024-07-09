const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const app = express();

//connection to monogodb
const dbURI =
  "mongodb+srv://RazakDudekula:Razak123@nodejs.qi4hgit.mongodb.net/RazakDudekula?retryWrites=true&w=majority&appName=nodejs";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// app.get("/add-blog", (req, res) => {
//   const blog = new Blog({
//     title: "new blog",
//     snippet: "new blog snippet",
//     body: "new blog body",
//   });
//   blog
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => console.log(err));
// });

// app.get("/all-blogs", (req, res) => {
//   Blog.find()
//     .then((result) => res.send(result))
//     .catch((err) => console.log(err));
// });

// app.get("/single-blog", (req, res) => {
//   Blog.findById("668c258eaf411ed17a3155fc")
//     .then((result) => res.send(result))
//     .catch((err) => console.log(err));
// });

//middlewares
// .get .use all are middle wares
// app.use((req, res, next) => {
//   console.log(req.hostname);
//   console.log(req.path);
//   console.log(req.method);
//   next(); // if we do not use the next with the app.use function then the page will not move forward to any other page
// });

// app.use(morgan('dev'));

//middleware for static files

app.use(express.static("public")); // if this is not used then styles will not be available for the page
app.use(express.urlencoded({ extended: true })); //used to get all the url passed data
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "about" });
});

//blog routes

app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => console.log(err));
});

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog.save().then((result) => {
    res.redirect("/blogs");
  });
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => console.log(err));
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "create" });
});

app.use((req, res) => {
  res.render("404", { title: "404 error" });
});
