// Establish blank pokemon repository
let pokemonRepository = (() => {
  let repository = [];

  let getAll = () => {
    return repository;
  };

  let add = pokemon => {
    repository.push(pokemon);
  };

  //  Creates list items with pokemon names on each, adds them to list
  let addListItem = pokemon => {
    let pokemonList = document.querySelector(".pokemon-list");
    let pokemonListItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("pokemon-button");
    pokemonListItem.appendChild(button);
    pokemonList.appendChild(pokemonListItem);

    let showDetails = pokemon => {
      pokemonRepository.loadDetails(pokemon).then(() => {
        console.log(pokemon);
      });
    };

    button.addEventListener("click", () => {
      showDetails(pokemon);
    });
  };

  // Fetches the pokemon as objects from the API, adds them to the repository
  let loadList = () => {
    return fetch("https://pokeapi.co/api/v2/pokemon/")
      .then(response => response.json())
      .then(data => {
        data.results.forEach(item => {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  let loadDetails = item => {
    return fetch(item.detailsUrl)
      .then(response => response.json())
      .then(pokemon => {
        item.id = pokemon.id;
        item.height = pokemon.height;
        item.weight = pokemon.weight;
        item.image = pokemon.sprites.front_default;
        item.abilities = pokemon.abilities.map(ability => ability.ability.name);
      })
      .catch(errormessage => {
        console.error(errormessage);
      });
  };

  return {
    add,
    getAll,
    addListItem,
    loadList,
    loadDetails,
  };
})();

pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach(pokemon => {
    pokemonRepository.addListItem(pokemon);
  });
});
