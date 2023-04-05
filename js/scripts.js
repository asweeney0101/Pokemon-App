// Establish blank pokemon repository
let pokemonRepository = (() => {
  let repository = [];

  let getAll = () => {
    return repository;
  };

  let add = pokemon => {
    repository.push(pokemon);
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


  //  Creates list items with pokemon names on each, adds them to list
  let addListItem = pokemon => {
    let pokemonList = document.querySelector(".pokemon-list");
    let pokemonListItem = document.createElement("li");
    pokemonListItem.classList.add("list-group-item");
    let button = document.createElement("button");
    button.classList.add("pokemon-button", "btn", "btn-primary", "btn-block", "d-flex", "align-items-center");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", ".modal");
  
    // Create an image placeholder
    let pokemonImage = document.createElement("img");
    pokemonImage.src = "https://via.placeholder.com/50";
    pokemonImage.alt = `${pokemon.name} image`;
    pokemonImage.width = 50;
    pokemonImage.height = 50;
    pokemonImage.classList.add("m-1");
  
    // Create a text node for the Pokemon name
    let pokemonName = document.createTextNode(pokemon.name);
  
    // Append the image and name to the button
    button.appendChild(pokemonImage);
    button.appendChild(pokemonName);
  
    pokemonListItem.appendChild(button);
    pokemonList.appendChild(pokemonListItem);
    pokemonRepository.addClickListener(button, pokemon);
  
    // Load the actual image after the names are loaded
    pokemonRepository.loadDetails(pokemon).then(() => {
      pokemonImage.src = pokemon.image;
    });
  };
  
 
  // Function to add a click event listener to each pokemon button
  let addClickListener = (button, pokemon) => {
    button.addEventListener("click", () => {
      showDetails(pokemon);
    });
  };

    // Function to show details of a pokemon

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(() => {
      let modalTitle = document.querySelector(".modal-title");
      let modalImage = document.querySelector(".modal-body img");
      let modalText = document.querySelector(".modal-body p");

      modalTitle.textContent = pokemon.name;
      modalImage.setAttribute("src", pokemon.image);
      modalText.innerHTML = `Height: ${pokemon.height} <br> Weight: ${pokemon.weight} <br> Abilities: ${pokemon.abilities.join(", ")}`;
     
    });
  };
  
   return {
    add,
    getAll,
    addListItem,
    loadList,
    loadDetails,
    addClickListener     
  };
})();


pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach(pokemon => {
    pokemonRepository.addListItem(pokemon);
  });
});


