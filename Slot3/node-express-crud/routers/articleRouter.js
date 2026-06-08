const express = require("express");
const articles = require("../articles");

const articleRouter = express.Router();

articleRouter.use(express.json());
articleRouter.use(express.urlencoded({ extended: true }));

articleRouter
  .route("/")
  .get(async (req, res) => {
    try {
      res.status(200).json(articles);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  .post(async (req, res) => {
    try {
      const { title, date, text } = req.body;
      const newArticle = {
        id: articles.length ? articles[articles.length - 1].id + 1 : 1,
        title,
        date,
        text,
      };

      articles.push(newArticle);
      res.status(201).json(newArticle);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  })
  .put(async (req, res) => {
    try {
      res.status(403).json({
        message: "PUT operation not supported on /articles",
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  })
  .delete(async (req, res) => {
    try {
      articles.splice(0, articles.length);
      res.status(200).json({ message: "Deleting all articles" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

articleRouter
  .route("/:id")
  .get(async (req, res) => {
    try {
      const id = Number.parseInt(req.params.id, 10);
      const article = articles.find((item) => item.id === id);

      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }

      res.status(200).json(article);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  .post(async (req, res) => {
    try {
      res.status(403).json({
        message: `POST operation not supported on /articles/${req.params.id}`,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  })
  .put(async (req, res) => {
    try {
      const id = Number.parseInt(req.params.id, 10);
      const article = articles.find((item) => item.id === id);

      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }

      const { title, date, text } = req.body;
      article.title = title;
      article.date = date;
      article.text = text;

      res.status(200).json(article);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const id = Number.parseInt(req.params.id, 10);
      const index = articles.findIndex((item) => item.id === id);

      if (index === -1) {
        return res.status(404).json({ message: "Article not found" });
      }

      const deletedArticle = articles.splice(index, 1)[0];
      res.status(200).json(deletedArticle);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

module.exports = articleRouter;
