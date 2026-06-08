const session = require("express-session");
const MongoStore = require("connect-mongo");

const sessionConfig = (app) => {
  app.use(
    session({
      secret: "mysecretkey",
      resave: false,
      saveUninitialized: true,
      store: MongoStore.create({
        mongoUrl: "mongodb://localhost:27017/ex22",
        collectionName: "sessions",
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      },
    })
  );
};

module.exports = sessionConfig;