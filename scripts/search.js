import { pullPokemonCaseAll, removeAtivoFromList } from "./filter.js";
import { createPokemonCard, pullPokemonsData } from "./main.js";
import resetCardList from "./resetState.js";
import { handleSelectedTypeSelectDropdown } from "./select.js";
import scrollToListStart from "./windowScroller.js";
const searchedPokemon = document.querySelectorAll(".search input");
const inputEnter = document.querySelectorAll(".search .img-mask");
const loadMore = document.querySelector(".loadMore");
const pokemonTotalNumber = document.querySelector(".pokeball-icon h4");
const cardList = document.querySelector(".card-list");
const ElementAllFromList = document.querySelector(".type-list li.all");
const select = document.querySelector(".select-type-options");
const allElementFromSelect = document.querySelector(
  ".select-type-options li.all"
);

let loading = document.createElement("div");
loading.className = "loader";

inputEnter.forEach((item, index) =>
  item.addEventListener("click", () => handleSearch(index))
);

function handleSearch(index) {
  handleSelectedTypeSelectDropdown(allElementFromSelect);
  select.classList.remove("active");
  select.style.outline = "1px solid var(--type-all)";
  resetCardList();
  scrollToListStart();
  cardList.appendChild(loading);
  setTimeout(() => pullEspecificPokemon(index), 500);
}

function pullEspecificPokemon(index) {
  if (searchedPokemon[index].value === "") {
    pullPokemonCaseAll();
    item.preventDefault();
  }
  select.style.outline = "1px solid var(--type-all)";
  removeAtivoFromList();
  pokemonTotalNumber.innerHTML = "0 pokemons";

  axios({
    url:
      "https://pokeapi.co/api/v2/pokemon/" +
      searchedPokemon[index].value.toLowerCase(),
  })
    .then((r) => r.data)
    .then((pokemon) => {
      resetCardList();
      let { name, types, id, sprites } = pokemon;
      console.log(id);
      let spriteSelected =
        sprites.other.dream_world.front_default !== null
          ? sprites.other.dream_world.front_default
          : sprites.front_default;
      createPokemonCard(name, types[0].type.name, id, spriteSelected);
      pokemonTotalNumber.innerHTML = "01 pokemon";
    })
    .catch((status) => {
      handleZeroPokemon(searchedPokemon[index].value);
    });
  loadMore.classList.add("inativo");
}

function handleZeroPokemon(buscado) {
  cardList.innerHTML =
    '<button> <div class="zero-pokeball"><img src="assets/pokeball-black.png"></div> <div class="Textos"> <p>The Pokemon or ID: <h4>' +
    buscado +
    "</h4> <p>Does not exist</p> <p> Press this button to return </p><div/>" +
    ElementAllFromList.innerHTML +
    "</button>";
  cardList.firstChild.classList.add("zero-pokemons");
  cardList.firstChild.addEventListener("click", () => {
    pullPokemonCaseAll();
    resetCardList();
  });
}
