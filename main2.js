// GLOBALS DECLARATIONS
const APIURL = "https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0";
const mainPokemonContainer = document.querySelector (".main__pokemonContainer");
const mainInput = document.querySelector ("#mainInput");
const mainButton = document.querySelector ("#mainButton");
const autocompleteList = document.querySelector ("#autocompleteList");
const header = document.querySelector ("#header");
const main = document.querySelector ("#main");
const footer = document.querySelector ("#footer");
const resetButton = document.querySelector ("#resetButton");
let allPokemonsNames = [];

// EVENTS
//Close the Dropdown list when click outside
header.addEventListener ('click', function(){
  autocompleteList.classList.add ('inactive');
})
main.addEventListener ('click', function(){
  autocompleteList.classList.add ('inactive');
})
footer.addEventListener ('click', function(){
  autocompleteList.classList.add ('inactive');
})
mainInput.addEventListener ('click', function(){
  autocompleteList.classList.remove ('inactive');
})

resetButton.addEventListener('click', clear)

//Search when click on button
mainButton.addEventListener ('click', loadImgPokemons);

//search with enter
mainInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    const enterPokemon = allPokemonsNames.find( x => x === mainInput.value)
    if (enterPokemon){
      loadImgPokemons();
      autocompleteList.classList.add ('inactive');
    } else {
      alert ('Select a valid pokemon')
    }
  }
});

// Calling the search with type a letter
mainInput.addEventListener('input', function (){
  if(mainInput.value !== ""){
    autocompleteList.classList.remove ('inactive');
    const filteredData = filterData(allPokemonsNames, mainInput.value);
    loadData(filteredData, autocompleteList);
  } else {
    autocompleteList.classList.add ('inactive');
  }
})

// FUNCTIONS
//fetchData function - Do a fetch from a API
function fetchData (urlApi) {
  return fetch (urlApi)
}

// getPokemons - Get the pokemons list from the API
async function getPokemons () {
  try {
    const res = await fetchData (APIURL);
    const response = await res.json();
    const allPokemonsData = response.results;
    allPokemonsNames = allPokemonsData.map (x => x.name);
    allPokemonsNames.sort();
  } catch (err){
    console.error (err.menssage);
    throw err;
  }
}

// filterData function - Do the match between the input and the list of pokemons
function filterData (pokemons, searchText){
  return pokemons.filter( x => x.toLowerCase().includes(searchText.toLowerCase()));
}

// LoadData function - Load the Dropdown list
function loadData (pokemons, element){
  if(pokemons){
    element.innerHTML = "";
    pokemons.forEach((item) => {
      let innetElement = "";
      innetElement += `${item}`;
      const ullist = document.createElement ("li");
      ullist.innerHTML = innetElement;
      ullist.setAttribute ('id', `${innetElement}`);
      autocompleteList.append(ullist);
      const pokemonChosen = document.getElementById (`${innetElement}`);
      pokemonChosen.addEventListener ('click', function (){
        mainInput.value = pokemonChosen.innerText;
        autocompleteList.classList.add ('inactive');
        loadImgPokemons ();
      })
    });
  } 
}

function loadImgPokemons () {
  if (mainInput.value != ""){
    fetchData (`https://pokeapi.co/api/v2/pokemon/${mainInput.value}`)
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
      pokemonName.innerText = `${mainInput.value}`;
      
      pokemonFigure.append (pokemonImg, pokemonName);
      mainPokemon.append (pokemonFigure);
      mainPokemonContainer.append(mainPokemon);
      mainInput.value = "";
    })
  }
}

function clear () {
  const shownedPokemons = document.getElementsByClassName ('main--pokemon');
  for (let i = 0; shownedPokemons.length; ) {
    shownedPokemons [i].remove();
  }
}

// Program
(async function () {
  try{
    await getPokemons ();
  } catch (err){
    console.error (err.menssage);
  }
})();


