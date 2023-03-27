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
    pokemonRepository.addClickListener(button, pokemon);
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

  // Adds details of the pokemon to the item
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

  // Function to add a click event listener to each pokemon button
  let addClickListener = (button, pokemon) => {
    button.addEventListener("click", () => {
      pokemonRepository.showDetails(pokemon);
    });
  };

    // Function to show details of a pokemon
  let detailsContainer = document.querySelector("#details-container");
 
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(() => {
      let modalTitle = document.querySelector("#details-container h1");
      let modalImage = document.querySelector("#details-container img");
      let modalText = document.querySelector("#details-container p");
      
      modalTitle.textContent = pokemon.name;
      modalImage.setAttribute("src", pokemon.image);
      modalText.innerHTML = `Height: ${pokemon.height} <br> Weight: ${pokemon.weight} <br> Abilities: ${pokemon.abilities.join(", ")}`;
      
      detailsContainer.classList.add("is-visible");
    });
  };
  
  function hideDetails() {
    detailsContainer.classList.remove("is-visible");
  };
  
  document.querySelector(".details-close").addEventListener("click", () => {
    hideDetails();
  });
  
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && detailsContainer.classList.contains("is-visible")){
      hideDetails();
    }
  });
  
  detailsContainer.addEventListener('click', (e) => {
     if (e.target === detailsContainer) {
      hideDetails();
    }
  });

  return {
    add,
    getAll,
    addListItem,
    loadList,
    loadDetails,
    addClickListener,
    showDetails
  };
})();


pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach(pokemon => {
    pokemonRepository.addListItem(pokemon);
  });
});


