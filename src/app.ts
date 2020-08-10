import path from "path";
import express from "express";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve("public")));

app.use("/images", express.static(path.resolve("images")));
app.set("view engine", "ejs");
app.set("views", path.resolve("views"));

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
