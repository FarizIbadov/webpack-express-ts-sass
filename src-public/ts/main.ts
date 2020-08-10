import "../sass/main.scss";

const title = document.getElementById("title");

if (title) {
  title.addEventListener("click", () => {
    title.classList.toggle("active");
  });
}

console.log("Hello");
