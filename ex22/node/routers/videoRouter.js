const express = require("express");

const videoRouter = express.Router();

const videos = [
  {
    id: 1,
    title: "Intro to Express",
    url: "https://example.com/express",
  },
];

videoRouter.use(express.json());
videoRouter.use(express.urlencoded({ extended: true }));

videoRouter
  .route("/")
  .get(async (req, res) => {
    res.status(200).json(videos);
  })
  .post(async (req, res, next) => {
    try {
      const { title, url } = req.body;

      if (!title || !url) {
        const error = new Error("Missing required video fields");
        error.statusCode = 400;
        throw error;
      }

      const newVideo = {
        id: videos.length ? videos[videos.length - 1].id + 1 : 1,
        title,
        url,
      };

      videos.push(newVideo);
      res.status(201).json(newVideo);
    } catch (err) {
      next(err);
    }
  })
  .put(async (req, res, next) => {
    try {
      const error = new Error("PUT operation not supported on /videos");
      error.statusCode = 405;
      throw error;
    } catch (err) {
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      videos.splice(0, videos.length);
      res.status(200).json({ message: "Deleting all videos" });
    } catch (err) {
      next(err);
    }
  });

videoRouter
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const id = Number.parseInt(req.params.id, 10);
      const video = videos.find((item) => item.id === id);

      if (!video) {
        const error = new Error("Video not found");
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json(video);
    } catch (err) {
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const error = new Error(
        `POST operation not supported on /videos/${req.params.id}`,
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
      const video = videos.find((item) => item.id === id);

      if (!video) {
        const error = new Error("Video not found");
        error.statusCode = 404;
        throw error;
      }

      const { title, url } = req.body;
      video.title = title;
      video.url = url;

      res.status(200).json(video);
    } catch (err) {
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const id = Number.parseInt(req.params.id, 10);
      const index = videos.findIndex((item) => item.id === id);

      if (index === -1) {
        const error = new Error("Video not found");
        error.statusCode = 404;
        throw error;
      }

      const deletedVideo = videos.splice(index, 1)[0];
      res.status(200).json(deletedVideo);
    } catch (err) {
      next(err);
    }
  });

module.exports = videoRouter;
