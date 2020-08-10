"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../sass/main.scss");
const title = document.getElementById("title");
if (title) {
    title.addEventListener("click", () => {
        title.classList.toggle("active");
    });
}
console.log("Hello");
