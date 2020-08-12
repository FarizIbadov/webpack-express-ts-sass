"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
const csurf_1 = __importDefault(require("csurf"));
dotenv_1.default.config();
const MongoDbStore = connect_mongodb_session_1.default(express_session_1.default);
const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 5000;
const app = express_1.default();
app.disable("x-powered-by");
const store = new MongoDbStore({
    uri: MONGODB_URL,
    collection: "session",
});
const csrfProtection = csurf_1.default();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.resolve("public")));
app.use("/images", express_1.default.static(path_1.default.resolve("images")));
app.set("view engine", "ejs");
app.set("views", path_1.default.resolve("views"));
app.use(express_session_1.default({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        httpOnly: true,
        maxAge: 3600 * 1000 * 24 * 7,
    },
}));
app.use(csrfProtection);
app.get("/", (req, res) => {
    res.render("pages/index");
});
mongoose_1.default
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
