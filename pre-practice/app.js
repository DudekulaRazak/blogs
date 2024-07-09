const express = require("express");

const app = express();

//re3gister view engine

app.set('view engine', 'ejs');

//listen to the requests

app.listen(3000);

app.get("/", (req, res) => {
  res.send("<p>hellooooo</p>");
});

app.get("/about", (req, res) => {
  res.sendFile("./views/about.html", { root: __dirname });
});

// redirects

app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

//404 // should always be in the end ==> use function
app.use((req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});
