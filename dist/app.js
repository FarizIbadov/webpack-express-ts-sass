"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const PORT = process.env.PORT || 5000;
const app = express_1.default();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.resolve("public")));
app.use("/images", express_1.default.static(path_1.default.resolve("images")));
app.set("view engine", "ejs");
app.set("views", path_1.default.resolve("views"));
app.get("/", (req, res) => {
    res.render("pages/index");
});
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
