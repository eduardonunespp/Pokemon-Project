import createModal from "./modal.js";
import {
  handleSelectedTypeSelectDropdown,
  toogleSelectDropdown,
} from "./select.js";
import toHandleCase from "./toHandleCase.js";
let card = document.querySelectorAll(".card");
let apiIndex = 0;
const pokemonTotalNumber = document.querySelector(".pokeball-icon h4");
const ElementAllFromList = document.querySelector(".type-list li.all");
const allElementFromSelect = document.querySelector(
  ".select-type-options li.all"
);
const select = document.querySelector(".select-input-type");

export function pullPokemonsData(pokeurl, index) {
  pullPokemonNumbers("https://pokeapi.co/api/v2/pokemon?limit=12&offset=0");

  axios({
    baseURL: pokeurl,
  })
    .then((r) => r.data.results)
    .then((pokedata) => {
      pokedata.forEach((pokemons) => {
        axios({
          baseURL: pokemons.url,
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
      });
    });
  // sprites.versions["generation-v"]["black-white"].animated.front_default
  apiIndex += 12;
  if (index === "reset") apiIndex = 12;
  ElementAllFromList.classList.add("ativo");
  handleSelectedTypeSelectDropdown(allElementFromSelect);
  toogleSelectDropdown();
  select.style.outline = "1px solid var(--type-all)";
}

const PokemonCardList = document.querySelector(".card-list");
let bool;
export function stop(i) {
  bool = i === undefined;
}

export function createPokemonCard(name, type, id, sprite) {
  if (bool === false) return 0;

  if (sprite === null) return 0;
  const pokemonSingleCard = document.createElement("div");
  pokemonSingleCard.className = "card";
  PokemonCardList.appendChild(pokemonSingleCard);

  const pokemonImageMask = document.createElement("div");
  pokemonImageMask.className = "img-mask";
  pokemonSingleCard.appendChild(pokemonImageMask);

  const pokemonBackground = document.createElement("div");
  pokemonImageMask.appendChild(pokemonBackground);
  pokemonBackground.className = "img-background";
  pokemonBackground.classList.add(type);

  const pokemonImage = document.createElement("img");
  pokemonBackground.appendChild(pokemonImage);
  pokemonImage.src = sprite;

  const pokemonCardFooter = document.createElement("div");
  pokemonSingleCard.appendChild(pokemonCardFooter);
  pokemonCardFooter.className = "card-footer";

  const pokemonInfo = document.createElement("div");
  pokemonCardFooter.appendChild(pokemonInfo);
  pokemonInfo.className = "info";

  const pokemonIdHash = document.createElement("span");
  pokemonInfo.appendChild(pokemonIdHash);
  pokemonIdHash.className = "number";
  pokemonIdHash.innerText =
    id < 10 ? "#00" + id : id < 100 ? "#0" + id : "#" + id;

  const pokemonName = document.createElement("h3");
  pokemonInfo.appendChild(pokemonName);
  pokemonName.className = "pokemon-name";
  pokemonName.innerText = toHandleCase(name);

  const pokemonTypeIcon = document.createElement("img");
  pokemonCardFooter.appendChild(pokemonTypeIcon);
  pokemonTypeIcon.src = "assets/icon-types/" + type + ".svg";

  pokemonSingleCard.animate(
    [
      // keyframes
      {
        transform: "translateY(50px) translateX(-50px)",
        opacity: 0,
        filter: "brightness(0)",
      },
      { transform: "translateY( 0 )" },
    ],
    300
  );
  cardListener();
}

function cardListener() {
  card = document.querySelectorAll(".card");
  card.forEach((item, index) => {
    item.addEventListener("click", toggleModal);
  });
}

const modal = document.querySelector(".modal");
let modalBox = document.querySelector(".box");
function toggleModal(event) {
  modalBox = document.querySelector(".box");
  if (modalBox) {
    modal.removeChild(modalBox);
  }
  pullDetailedPokemonDatas(
    "https://pokeapi.co/api/v2/pokemon/" +
      +event.currentTarget.children[1].children[0].children[0].innerText.slice(
        1
      )
  );
  modal.classList.add("ativo");
}

export function pullPokemonNumbers(pokeUrl) {
  axios({
    baseURL: pokeUrl,
  })
    .then((r) => r.data)
    .then((j) => (pokemonTotalNumber.innerText = j.count + " pokemons"));
}

function pullDetailedPokemonDatas(pokeurl) {
  axios({
    baseURL: pokeurl,
  })
    .then((r) => r.data)
    .then((pokemon) => {
      const {
        name,
        types,
        id,
        sprites,
        ability,
        weight,
        height,
        stats,
        abilities,
      } = pokemon;
      let spriteSelected =
        sprites.other.dream_world.front_default !== null
          ? sprites.other.dream_world.front_default
          : sprites.front_default;

      createModal(
        name,
        id,
        spriteSelected,
        types,
        abilities,
        height,
        weight,
        stats
      );
    });
}

pullPokemonsData(
  "https://pokeapi.co/api/v2/pokemon?limit=12&offset=0",
  "reset"
);

const loadMorePokemonBtn = document.querySelector(".loadMore");

loadMorePokemonBtn.addEventListener("click", () =>
  pullPokemonsData(
    "https://pokeapi.co/api/v2/pokemon?offset=" + apiIndex + "&limit=12"
  )
);
