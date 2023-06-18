import {
  createPokemonCard,
  pullPokemonNumbers,
  pullPokemonsData,
} from "./main.js";
import resetCardList from "./resetState.js";
import scrollToListStart from "./windowScroller.js";
const listItems = document.querySelectorAll(".type-list li");
let loading = document.createElement("div");
const cardList = document.querySelector(".card-list");

loading.className = "loader";

listItems.forEach((listItem, index) => {
  listItem.addEventListener("click", () => {
    handleFilter(index);
    removeAtivoFromList();
    listItem.classList.add("ativo");
  });
});

export function removeAtivoFromList() {
  listItems.forEach((item) => item.classList.remove("ativo"));
}

const pokemonTotalNumber = document.querySelector(".pokeball-icon h4");
const loadMore = document.querySelector(".loadMore");

export function pullPokemonCaseAll() {
  resetCardList();
  pullPokemonsData(
    "https://pokeapi.co/api/v2/pokemon?limit=12&offset=0",
    "reset"
  );
  loadMore.classList.contains("inativo");
  loadMore.classList.remove("inativo");
  scrollToListStart();
}

export function handleFilter(index) {
  resetCardList();
  scrollToListStart();
  cardList.appendChild(loading);
  setTimeout(() => pullPokemonByType(index), 200);
}

export default async function pullPokemonByType(index) {
  resetCardList();
  if ((index === 0) | (index === "all")) {
    pullPokemonCaseAll();
    return 0;
  }

  await axios({
    baseURL: "https://pokeapi.co/api/v2/type/" + index,
  })
    .then((r) => r.data.pokemon)
    .then((pokemons) =>
      pokemons.forEach((item, index, array) => {
        if (index === array.length - 1)
          pokemonTotalNumber.innerText = array.length + " pokemons";
        axios({
          baseURL: item.pokemon.url,
        })
          .then((r) => r.data)
          .then((pokemon) => {
            const { name, types, id, sprites } = pokemon;
            let spriteSelected =
              sprites.other.dream_world.front_default !== null
                ? sprites.other.dream_world.front_default
                : sprites.front_default;
            createPokemonCard(name, types[0].type.name, id, spriteSelected);
          });
      })
    );
  scrollToListStart();
  loadMore.classList.add("inativo");
}
