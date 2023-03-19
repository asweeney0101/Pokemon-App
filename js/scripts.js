
let pokemonRepository = (function () {
  let repository = [
    {
      name: "Charmeleon",
      height: 1.1,
      abilities: ["Blaze", "Solar-Powered"]
    },   
    {
      name: "Sandslash",
      height: 1.0,
      abilities: ["Sand-Veil", "Sand-Rush"]
    },
    {
      name: "Primeape",
      height: 1.0,
      abilities: ["Vital-Spirit", "Anger-Point", "Defiant"]
    } 
  ]

    function getAll () {
      return repository;
    }
    function add (pokemon) {
      repository.push(pokemon);
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
      addListItem: addListItem
    };
  })();


  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });