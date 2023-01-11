const APIURL = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";
const mainPokemonContainer = document.querySelector (".main__pokemonContainer");

function fetchData (urlApi) {
  return fetch (urlApi)
}

    // ------------------------Fetching Data from API (taking name and img) ----------------------------
fetchData (APIURL)
  .then (res => res.json())
  .then (response => {
    for (let i = 0; i <= 10; i++){
      const pokeName = response.results[i].name;
      fetchData (`https://pokeapi.co/api/v2/pokemon/${response.results[i].name}`)
        .then (response => response.json())
        .then ((pokeImg) => {
          pokeImg = pokeImg.sprites.front_default;

          // -----------------Adding the html from js--------------------------------------------
          const mainPokemon = document.createElement ('div');
          mainPokemon.classList.add ('main--pokemon');

          const  pokemonFigure = document.createElement ('figure');
          const  pokemonImg = document.createElement ('img');
          pokemonImg.setAttribute ('alt','Pokemon')
          pokemonImg.setAttribute ('src', pokeImg)

          const pokemonName = document.createElement ('p');
          pokemonName.innerText = pokeName;
          
          pokemonFigure.append (pokemonImg, pokemonName);
          mainPokemon.append (pokemonFigure);
          mainPokemonContainer.append(mainPokemon);
        })
    }
  })