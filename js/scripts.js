
let pokemonRepository = (function () {
  let repository = []

    function getAll () {
      return repository;
    }
    function add (pokemon) {
      repository.push(pokemon);
    }

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

   function loadDetails(pokemon){
    return fetch(detailsUrl)
    .then(function(response){

    })
  }


    function addListItem(pokemon){
      let pokemonList = document.querySelector(".pokemon-list");
      let pokemonListItem = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("pokemon-button");
      pokemonListItem.appendChild(button);
      pokemonList.appendChild(pokemonListItem);
     
    function showDetails(pokemon){
      console.log(pokemon);
    }

    button.addEventListener("click", function(){
      showDetails(pokemon);
    })
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