const express = require("express");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const app = express();

const PORT = 3001;
const indexPath = path.resolve(__dirname, "..", "build", "index.html");

// static resources should just be served as they are
app.use(
  express.static(path.resolve(__dirname, "..", "build"), { maxAge: "30d" })
);

// here we serve the index.html page
app.get("/*", (req, res, next) => {
  fs.readFile(indexPath, "utf8", async (err, htmlData) => {
    if (err) {
      console.error("Error during file reading", err);
      return res.status(404).end();
    }

    const postId = req.query.id;

    await axios
      .get(`http://xolisnazar.uz/api/index/getNews/${postId}`)

      .then((response) => {
        const post = response.data;
        if (!post) return res.status(404).send("Post not found");
        // inject meta tags
        htmlData = htmlData
          .replace(
            "<title>Xolisnazar.uz</title>",
            `<title>${post.news.title}</title>`
          )
          .replace(
            /Мазкур сайт «Mahalla» nashriyot-matbaa uyi» масъулияти чекланган жамияти муассислигида нашр етилган./g,
            post.news.title
          )
          .replace(/__META_OG_DESCRIPTION__/g, post.news.subTitle)
          .replace(/Маҳалла газетасининг расмий сайти/g, post.news.subTitle)
          .replace(/Маҳалла газетасининг расмий сайти/g, post.news.subTitle)
          .replace(
            /__META_OG_IMAGE__/g,
            postId
              ? post.news.mainPhoto
              : "http://xolisnazar.uz/assets/accounts/xolis_narzar.png"
          );
      })
      .catch((error) => console.log(error.response.statusText));
    return res.send(htmlData);
  });
});

// listening...
app.listen(PORT, (error) => {
  if (error) {
    return console.log("Error during app startup", error);
  }
  console.log("listening on " + PORT + "...");
});
