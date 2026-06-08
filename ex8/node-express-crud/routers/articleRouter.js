const express = require("express");
const articles = require("../articles");

const articleRouter = express.Router();

articleRouter.use(express.json());
articleRouter.use(express.urlencoded({ extended: true }));

articleRouter
  .route("/")
  .get(async (req, res) => {
    res.status(200).json(articles);
  })
  .post(async (req, res, next) => {
    try {
      const { title, date, text } = req.body;

      if (!title || !text || !date) {
        const error = new Error("Missing required article fields");
        error.statusCode = 400;
        throw error;
      }
      const newArticle = {
        id: articles.length ? articles[articles.length - 1].id + 1 : 1,
        title,
        date,
        text,
      };

      articles.push(newArticle);
      res.status(201).json(newArticle);
    } catch (err) {
      next(err);
    }
  })
  .put(async (req, res, next) => {
    try {
      const error = new Error("PUT operation not supported on /articles");
      error.statusCode = 405;
      throw error;
    } catch (err) {
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      articles.splice(0, articles.length);
      res.status(200).json({ message: "Deleting all articles" });
    } catch (err) {
      next(err);
    }
  });

articleRouter
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const id = Number.parseInt(req.params.id, 10);
      const article = articles.find((item) => item.id === id);

      if (!article) {
        const error = new Error("Article not found");
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json(article);
    } catch (err) {
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const error = new Error(
        `POST operation not supported on /articles/${req.params.id}`,
      );
      error.statusCode = 405;
      throw error;
    } catch (err) {
      next(err);
    }
  })
  .put(async (req, res, next) => {
    try {
      const id = Number.parseInt(req.params.id, 10);
      const article = articles.find((item) => item.id === id);

      if (!article) {
        const error = new Error("Article not found");
        error.statusCode = 404;
        throw error;
      }

      const { title, date, text } = req.body;
      article.title = title;
      article.date = date;
      article.text = text;

      res.status(200).json(article);
    } catch (err) {
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const id = Number.parseInt(req.params.id, 10);
      const index = articles.findIndex((item) => item.id === id);

      if (index === -1) {
        const error = new Error("Article not found");
        error.statusCode = 404;
        throw error;
      }

      const deletedArticle = articles.splice(index, 1)[0];
      res.status(200).json(deletedArticle);
    } catch (err) {
      next(err);
    }
  });

module.exports = articleRouter;
