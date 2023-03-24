
// Establish blank pokemon repository
let pokemonRepository = (function () {
  let repository = []

    function getAll () {
      return repository;
    }
    function add (pokemon) {
      repository.push(pokemon);
    }
//  Creates list items with pokemon names on each, adds them to list
    function addListItem(pokemon){
      let pokemonList = document.querySelector(".pokemon-list");
      let pokemonListItem = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("pokemon-button");
      pokemonListItem.appendChild(button);
      pokemonList.appendChild(pokemonListItem);
     
    function showDetails(pokemon){
      pokemonRepository.loadDetails(pokemon).then(function(){
      console.log(pokemon);
      });
    }

    button.addEventListener("click", function(){
      showDetails(pokemon);
    })
  }


    // Fetches the pokemon as objects from the API, adds them to the repository
     function loadList () {
      return fetch("https://pokeapi.co/api/v2/pokemon/")
      .then(function(response){
        return response.json();
      })
      .then(function (data) {
        data.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (error) {
        console.error(error);
      });
   }


   function loadDetails(item) {
    return fetch(item.detailsUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (pokemon) {
        item.id = pokemon.id;
        item.height = pokemon.height;
        item.weight = pokemon.weight;
        item.image = pokemon.sprites.front_default;
        item.abilities = pokemon.abilities.map(function (ability) {
          return ability.ability.name;
        });
      })
      .catch(function (errormessage) {
        console.error(errormessage);
      });
  }


    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails
    };
  })();

 

  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });