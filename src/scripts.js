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
  return fetch("https://pokeapi.co/api/v2/pokemon/?limit=300")
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
    let pokemonListItem = document.createElement("div");
    pokemonListItem.classList.add("col-lg-3", "col-md-4", "col-sm-6", "mb-4"); 
    pokemonListItem.setAttribute("data-name", pokemon.name);
    let button = document.createElement("button");
    button.classList.add("pokemon-button", "btn", "btn-primary", "btn-block", "d-flex", "align-items-center");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", ".modal");
  
    // Create an image placeholder
    let pokemonImage = document.createElement("img");
    pokemonImage.src = "https://via.placeholder.com/75";
    pokemonImage.alt = `${pokemon.name} image`;
    pokemonImage.width = 75;
    pokemonImage.height = 75;
    pokemonImage.classList.remove("m-1");
  
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
  
 
  // Add a click event listener to each pokemon button
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
  }
  
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

//  Search bar 

let searchInput = document.querySelector("#searchInput");
searchInput.addEventListener("input", () => {
  let searchQuery = searchInput.value.toLowerCase();
  let pokemonList = pokemonRepository.getAll();

  pokemonList.forEach(pokemon => {
    let pokemonElement = document.querySelector('[data-name="' + pokemon.name + '"]');
    if (pokemon.name.toLowerCase().includes(searchQuery)) {
      pokemonElement.classList.remove("hidden");
    } else {
      pokemonElement.classList.add("hidden");
    }
  });
});


/* eslint-disable no-unused-vars */
function sortPokemon(event, sortType) {
 
  // Clear existing Pokémon list
  let pokemonList = document.querySelector(".pokemon-list");
  while (pokemonList.firstChild) {
    pokemonList.removeChild(pokemonList.firstChild);
  }

  // Create a shallow copy of the Pokémon list
  let sortedList = pokemonRepository.getAll().slice();

  // Define sorting methods
  switch (sortType) {
    case "nameAZ":
      sortedList.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "nameZA":
      sortedList.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "heightTallest":
      sortedList.sort((a, b) => b.height - a.height);
      break;
    case "heightShortest":
      sortedList.sort((a, b) => a.height - b.height);
      break;
    case "weightHeaviest":
      sortedList.sort((a, b) => b.weight - a.weight);
      break;
    case "weightLightest":
      sortedList.sort((a, b) => a.weight - b.weight);
      break;
    default:
      // Unsorted case
      sortedList = pokemonRepository.getAll().slice();
      break;
  }
  document.getElementById("sortDropdown").innerText = `Sort By: ${event.target.innerText}`;

  // Display the sorted Pokémon list
  sortedList.forEach(pokemon => {
    pokemonRepository.addListItem(pokemon);
  });
}

