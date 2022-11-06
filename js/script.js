const pokemonName = document.querySelector('.pokemonName');
const pokemonNumber = document.querySelector('.pokemonNumber');
const pokemonImage = document.querySelector('.pokemonImg');

const form = document.querySelector('.form');
const input = document.querySelector('.inputSearch');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNxt = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async pokemon => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();

    return data;
  }
};

const renderPokemon = async pokemon => {
  pokemonName.innerHTML = 'Searching...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src =
      data['sprites']['versions']['generation-v']['black-white']['animated'][
        'front_default'
      ];
    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonName.innerHTML = 'Not found :(';
    pokemonNumber.innerHTML = '';
  }
};

form.addEventListener('submit', e => {
  e.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  searchPokemon -= 1;
  renderPokemon(searchPokemon);
});
buttonNxt.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});
renderPokemon(searchPokemon);
