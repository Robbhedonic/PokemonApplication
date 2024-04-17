    async function fetchPokemon(index) {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`);
        const pokemonData = await response.json();
        return pokemonData;
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    }

    async function displayPokemon() {
      const pokemonContainer = document.getElementById('pokemonContainer');
      const currentPokemonCard = document.getElementById('currentPokemon');
      const pokemonName = document.getElementById('pokemonName');
      const pokemonImage = document.getElementById('pokemonImage');

      let index = 1;
      let intervalId = setInterval(async () => {
        const pokemonData = await fetchPokemon(index);
        pokemonName.textContent = pokemonData.name;
        pokemonImage.src = pokemonData.sprites.front_default;
        pokemonImage.alt = pokemonData.name;

        index++;
        if (index > 151) {
          index = 1;
        }
      }, 500);

      currentPokemonCard.addEventListener('mouseover', () => {
        clearInterval(intervalId);
      });

      currentPokemonCard.addEventListener('mouseout', () => {
        intervalId = setInterval(async () => {
          const pokemonData = await fetchPokemon(index);
          pokemonName.textContent = pokemonData.name;
          pokemonImage.src = pokemonData.sprites.front_default;
          pokemonImage.alt = pokemonData.name;

          index++;
          if (index > 151) {
            index = 1;
          }
        }, 1000);
      });
    }

    displayPokemon();