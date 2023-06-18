const main = document.querySelector(".main");
const downPointers = document.querySelectorAll(".down-pointer");
export default function scrollToListStart() {
  window.scrollTo({
    top: main.offsetTop,
    behavior: "smooth",
  });
}

downPointers.forEach((downPointer) =>
  downPointer.addEventListener("click", scrollToListStart)
);
let body = document.querySelector("body");

const upBtn = document.createElement("button");
upBtn.classList.add("up");
upBtn.innerHTML = '<img src="assets/arrow-down-red.svg">';
upBtn.style.transform = "rotate(180deg)";

function handleUpButton() {
  window.pageYOffset >= 1500
    ? upBtn.classList.remove("inativo")
    : upBtn.classList.add("inativo");
}

main.appendChild(upBtn);
upBtn.addEventListener("click", () => {
  scrollToListStart();
  upBtn.classList.add("inativo");
});
window.addEventListener("scroll", (event) => {
  handleUpButton();
});
