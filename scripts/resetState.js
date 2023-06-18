const cardList = document.querySelector(".card-list");
export default function resetCardList() {
  while (cardList.firstChild) cardList.firstChild.remove();
}
