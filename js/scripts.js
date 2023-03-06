

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
];


for (let i = 0; i < pokemonList.length; i++) {
    document.write(pokemonList[i].name + " (Height: " + pokemonList[i].height + ")");
 if (pokemonList[i].height > 1) {
    document.write(" - wow, that's a big one!");
 }
 document.write("<br>");
}

