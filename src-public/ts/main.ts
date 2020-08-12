import "../sass/main.scss";

const title = document.getElementById("title");
const body = document.getElementsByTagName("body")[0];

if (title) {
  title.addEventListener("click", () => {
    title.classList.toggle("active");
    body.classList.toggle("active");
  });
}

console.log("Webpack-Typescript");
