// Definición de la clase Pokemon
class Pokemon {
  constructor(name, types, weight, height, stats, imageUrl) {
    this.name = name; // Nombre del Pokémon
    this.types = types; // Tipos del Pokémon
    this.weight = weight; // Peso del Pokémon
    this.height = height; // Altura del Pokémon
    this.stats = stats; // Estadísticas del Pokémon
    this.imageUrl = imageUrl; // URL de la imagen del Pokémon
  }

  // Método para comparar este Pokémon con otro Pokémon
  compare(pokemon) {
    // Cálculo de la suma total de peso, altura y estadísticas
    let thisTotal = this.weight + this.height + this.stats.reduce((acc, stat) => acc + stat, 0);
    let otherTotal = pokemon.weight + pokemon.height + pokemon.stats.reduce((acc, stat) => acc + stat, 0);
    let result = "";

    // Calcular diferencias en las estadísticas
    let differences = [];
    for (let i = 0; i < this.stats.length; i++) {
      differences.push(this.stats[i] - pokemon.stats[i]);
    }

    // Determinar el resultado de la comparación
    if (thisTotal > otherTotal) {
      result = `${this.name} has superiority!`;
    } else if (thisTotal < otherTotal) {
      result = `${pokemon.name} has superiority!`;
    } else {
      result = "It's a tie!";
    }

    // Devolver resultado de la comparación, junto con los Pokémon involucrados y las diferencias en las estadísticas
    return {
      result: result,
      thisPokemon: this,
      otherPokemon: pokemon,
      differences: differences
    };
  }

  // Método para renderizar la información del Pokémon en la interfaz de usuario
  render() {
    const infoDiv = document.getElementById('pokemon-info');
    infoDiv.innerHTML = `
    <div class="info">
      <h2>${this.name}</h2>
      <img src="${this.imageUrl}" alt="${this.name}">
      <p>Types: ${this.types.join(', ')}</p>
      <p>Weight: ${this.weight}</p>
      <p>Height: ${this.height}</p>
      <p>Stats:</p>
      <ul>
        <li>HP: ${this.stats[0]}</li>
        <li>Attack: ${this.stats[1]}</li>
        <li>Defense: ${this.stats[2]}</li>
        <li>Special Attack: ${this.stats[3]}</li>
        <li>Special Defense: ${this.stats[4]}</li>
        <li>Speed: ${this.stats[5]}</li>
      </ul>
    </div>
    `;
  }
}

// Función asincrónica para obtener datos de Pokémon de la API
async function getPokemonData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Pokemon data:', error);
  }
}

// Función para poblar los menús desplegables de selección de Pokémon
async function populateDropdown() {
  const select = document.getElementById('pokemon-select');
  const compareSelect = document.getElementById('compare-select');

  // Obtener datos de Pokémon de la API
  const pokemonData = await getPokemonData('https://pokeapi.co/api/v2/pokemon?limit=151');

  // Iterar sobre los resultados y agregar opciones a los menús desplegables
  pokemonData.results.forEach(async (pokemon, index) => {
    const pokemonDetails = await getPokemonData(pokemon.url);
    const name = pokemonDetails.name;
    const option = new Option(name, index);
    const compareOption = new Option(name, index);
    select.add(option);
    compareSelect.add(compareOption);
  });

  // Evento para manejar cambios en el menú desplegable de selección de Pokémon
  select.addEventListener('change', async function() {
    const selectedIndex = this.value;
    const selectedPokemonData = await getPokemonData(`https://pokeapi.co/api/v2/pokemon/${parseInt(selectedIndex) + 1}`);
    const selectedPokemon = createPokemon(selectedPokemonData);
    selectedPokemon.render();
  });

  // Evento para manejar cambios en el menú desplegable de comparación de Pokémon
  compareSelect.addEventListener('change', async function() {
    const selectedIndex = this.value;
    const selectedPokemonData = await getPokemonData(`https://pokeapi.co/api/v2/pokemon/${parseInt(selectedIndex) + 1}`);
    const selectedPokemon = createPokemon(selectedPokemonData);
    const selectedPokemonIndex = document.getElementById('pokemon-select').value;
    const originalPokemonData =
    // Obtener datos del Pokémon original seleccionado
    await getPokemonData(`https://pokeapi.co/api/v2/pokemon/${parseInt(selectedPokemonIndex) + 1}`);
    const originalPokemon = createPokemon(originalPokemonData);

    // Obtener resultado de la comparación
    const comparisonResult = document.getElementById('comparison-result');
    const result = originalPokemon.compare(selectedPokemon);

    // Construir información de la comparación y mostrarla en la interfaz de usuario
    const comparisonInfo = `
    <div class= "results">
      <p>${result.result}</p>
      <div class = "diference">
      <h2>Stat Differences:</h2>
      <ul>
        <li>${originalPokemon.stats[0] > selectedPokemon.stats[0] ? originalPokemon.name : selectedPokemon.name} has ${Math.abs(result.differences[0])} more HP</li>
        <li>${originalPokemon.stats[1] > selectedPokemon.stats[1] ? originalPokemon.name : selectedPokemon.name} has ${Math.abs(result.differences[1])} more Attack</li>
        <li>${originalPokemon.stats[2] > selectedPokemon.stats[2] ? originalPokemon.name : selectedPokemon.name} has ${Math.abs(result.differences[2])} more Defense</li>
        <li>${originalPokemon.stats[3] > selectedPokemon.stats[3] ? originalPokemon.name : selectedPokemon.name} has ${Math.abs(result.differences[3])} more Special Attack</li>
        <li>${originalPokemon.stats[4] > selectedPokemon.stats[4] ? originalPokemon.name : selectedPokemon.name} has ${Math.abs(result.differences[4])} more Special Defense</li>
        <li>${originalPokemon.stats[5] > selectedPokemon.stats[5] ? originalPokemon.name : selectedPokemon.name} has ${Math.abs(result.differences[5])} more Speed</li>
      </ul>
      </div>
    </div>
      <div class="pokemon-comparison">
      <div class="comparison-block">
      <h3>${result.thisPokemon.name}</h3>
      <img src="${result.thisPokemon.imageUrl}" alt="${result.thisPokemon.name}">
      <ul>
        <li>Types: ${result.thisPokemon.types.join(', ')}</li>
        <li>Weight: ${result.thisPokemon.weight}</li>
        <li>Height: ${result.thisPokemon.height}</li>
        <li>Stats:</li>
        <ul>
          <li>HP: ${result.thisPokemon.stats[0]}</li>
          <li>Attack: ${result.thisPokemon.stats[1]}</li>
          <li>Defense: ${result.thisPokemon.stats[2]}</li>
          <li>Special Attack: ${result.thisPokemon.stats[3]}</li>
          <li>Special Defense: ${result.thisPokemon.stats[4]}</li>
          <li>Speed: ${result.thisPokemon.stats[5]}</li>
        </ul>
      </ul>
      </div>
      <div class="comparison-block">
      <h3>${result.otherPokemon.name}</h3>
      <img src="${result.otherPokemon.imageUrl}" alt="${result.otherPokemon.name}">
      <ul>
        <li>Types: ${result.otherPokemon.types.join(', ')}</li>
        <li>Weight: ${result.otherPokemon.weight}</li>
        <li>Height: ${result.otherPokemon.height}</li>
        <li>Stats:</li>
        <ul>
          <li>HP: ${result.otherPokemon.stats[0]}</li>
          <li>Attack: ${result.otherPokemon.stats[1]}</li>
          <li>Defense: ${result.otherPokemon.stats[2]}</li>
          <li>Special Attack: ${result.otherPokemon.stats[3]}</li>
          <li>Special Defense: ${result.otherPokemon.stats[4]}</li>
          <li>Speed: ${result.otherPokemon.stats[5]}</li>
        </ul>
      </ul>
      </div>
      </div>
    `;
    comparisonResult.innerHTML = comparisonInfo;
  });
}

// Función para crear un objeto Pokémon a partir de los datos obtenidos de la API
function createPokemon(pokemonData) {
  const name = pokemonData.name;
  const types = pokemonData.types.map(type => type.type.name);
  const weight = pokemonData.weight;
  const height = pokemonData.height;
  const stats = pokemonData.stats.map(stat => stat.base_stat);
  const imageUrl = pokemonData.sprites.front_default;

  return new Pokemon(name, types, weight, height, stats, imageUrl);
}

// Llamar a la función para poblar los menús desplegables al cargar la página
populateDropdown();




   let audio = document.getElementById("myAudio");

 