import path from "path";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";
import connectMongoDBSession from "connect-mongodb-session";
import csrf from "csurf";

dotenv.config();

const MongoDbStore = connectMongoDBSession(session);

const MONGODB_URL = process.env.MONGODB_URL!;
const PORT = process.env.PORT || 5000;

const app = express();

app.disable("x-powered-by");
const store = new MongoDbStore({
  uri: MONGODB_URL,
  collection: "session",
});
const csrfProtection = csrf();

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve("public")));

app.use("/images", express.static(path.resolve("images")));
app.set("view engine", "ejs");
app.set("views", path.resolve("views"));

app.use(
  session({
    secret: process.env.SECRET!,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      httpOnly: true,
      maxAge: 3600 * 1000 * 24 * 7,
    },
  })
);
app.use(csrfProtection);
app.get("/", (req, res) => {
  res.render("pages/index");
});

mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB Connected!");
    app.listen(PORT, () => {
      console.log(`Listening on http://localhost:${PORT}`);
    });
  })
  .catch(() => {
    console.log("Error with DB Connection!");
  });
