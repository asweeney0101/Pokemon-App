

let pokemonRepository = (function () {
  let pokemonList = [
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
      return pokemonList;
    }
    function add (pokemon) {
      pokemonList.push(pokemon);
    }

    return {
      getAll: getAll,
      add: add
    }

  })()   

  function displayPokemon(pokemon) {
    document.write(pokemon.name + " (Height: " + pokemon.height + ")");
    if (pokemon.height > 1) {
      document.write(" - wow, that's a big one! ");
    }
    document.write("<br>");
  }

  pokemonRepository.getAll().forEach(function(pokemon) {
    displayPokemon(pokemon);
  });