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
  if (pokemonName.innerHTML !== '') {
    pokemonName.innerHTML = '...';
    pokemonNumber.innerHTML = '...';
  }

  let data;
  if (isNaN(pokemon)) {
    data = await fetchPokemon(pokemon.toLowerCase());
  } else {
    data = await fetchPokemon(pokemon);
  }

  if (data) {
    pokemonName.innerHTML = data.name || 'Name not found';
    pokemonNumber.innerHTML = data.id || 'ID not found';
    pokemonImage.src =
      data.sprites?.versions?.['generation-v']?.['black-white']?.animated
        ?.front_default || '';
    input.value = '';
    searchPokemon = data.id;
  }
};

form.addEventListener('submit', e => {
  e.preventDefault();
  const searchTerm = input.value.trim();
  if (!isNaN(searchTerm)) {
    renderPokemon(parseInt(searchTerm));
  } else {
    renderPokemon(searchTerm);
  }
});

input.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    form.dispatchEvent(new Event('submit'));
  }
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  } else {
    console.log('Já está no primeiro Pokémon');
  }
});

buttonNxt.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
