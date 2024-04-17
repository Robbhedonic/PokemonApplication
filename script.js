  class Pokemon {
    constructor(name, image, types, weight, height, stats) {
      this.name = name;
      this.image = image;
      this.types = types;
      this.weight = weight;
      this.height = height;
      this.stats = stats;
    }
    
    displayInfo() {
      const infoContainer = document.getElementById('pokemon-info');
      infoContainer.innerHTML = `
        <h2>${this.name}</h2>
        <img src="${this.image}" alt="${this.name}">
        <p>Types: ${this.types.join(', ')}</p>
        <p>Weight: ${this.weight}</p>
        <p>Height: ${this.height}</p>
        <p>Stats:</p>
        <ul>
          ${this.stats.map(stat => `<li>${stat.name}: ${stat.value}</li>`).join('')}
        </ul>
      `;
    }
    
    calculatePower() {
      return this.stats.reduce((acc, stat) => acc + stat.value, 0);
    }
  }

  // Fetch Pokemon data from API and populate the dropdown lists
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151';
  const pokemon1Select = document.getElementById('pokemon1-select');
  const pokemon2Select = document.getElementById('pokemon2-select');

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const pokemonList = data.results;
      pokemonList.forEach(pokemon => {
        const option1 = document.createElement('option');
        const option2 = document.createElement('option');
        option1.textContent = pokemon.name;
        option2.textContent = pokemon.name;
        pokemon1Select.appendChild(option1);
        pokemon2Select.appendChild(option2);
      });
    });

  // Function to fetch Pokemon info and create Pokemon objects
  function getPokemonInfo(name) {
    return new Promise((resolve, reject) => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response => response.json())
        .then(data => {
          const pokemon = new Pokemon(
            data.name,
            data.sprites.front_default,
            data.types.map(type => type.type.name),
            data.weight,
            data.height,
            data.stats.map(stat => ({ name: stat.stat.name, value: stat.base_stat }))
          );
          resolve(pokemon);
        })
        .catch(error => reject(error));
    });
  }

  // Function to start the battle
  function startBattle() {
    const pokemon1Name = pokemon1Select.value;
    const pokemon2Name = pokemon2Select.value;

    Promise.all([getPokemonInfo(pokemon1Name), getPokemonInfo(pokemon2Name)])
      .then(([pokemon1, pokemon2]) => {
        const power1 = pokemon1.calculatePower();
        const power2 = pokemon2.calculatePower();
        
        const battleLog = document.getElementById('battle-log');
        battleLog.innerHTML = ''; // Clear previous battle log
        
        const resultContainer = document.createElement('div');
        
        const result1 = document.createElement('div');
        result1.innerHTML = `
        <div  class="comparison-block">
          <h3>${pokemon1.name}</h3>
          <img src="${pokemon1.image}" alt="${pokemon1.name}">
          <p>Type: ${pokemon1.types.join(', ')}</p>
          <p>Weight: ${pokemon1.weight}</p>
          <p>Height: ${pokemon1.height}</p>
          <p>Power: ${power1}</p>
          <p>Stats:</p>
          <ul>
            ${pokemon1.stats.map(stat => `<li>${stat.name}: ${stat.value}</li>`).join('')}
          </ul>
          </div>
        `;
        resultContainer.appendChild(result1);
        
        const result2 = document.createElement('div');
        result2.innerHTML = `
        <div class="pokemon-comparison">
        <div  class="comparison-block">
          <h3>${pokemon2.name}</h3>
          <img src="${pokemon2.image}" alt="${pokemon2.name}">
          <p>Type: ${pokemon2.types.join(', ')}</p>
          <p>Weight: ${pokemon2.weight}</p>
          <p>Height: ${pokemon2.height}</p>
          <p>Power: ${power2}</p>
          <p>Stats:</p>
          <ul>
            ${pokemon2.stats.map(stat => `<li>${stat.name}: ${stat.value}</li>`).join('')}
          </ul>
          </div>
          
        `;
        resultContainer.appendChild(result2);
        
        if (power1 > power2) {
          result1.classList.add('winner');
        } else if (power1 < power2) {
          result2.classList.add('winner');
        } else {
          result1.classList.add('tie');
          result2.classList.add('tie');
        }
        
        battleLog.appendChild(resultContainer);
      })
      .catch(error => console.error('Error starting battle:', error));
  }
  
  // Function to display Pokemon info
  function displayPokemonInfo() {
    const pokemonName = document.getElementById('pokemon-select').value;
    getPokemonInfo(pokemonName)
      .then(pokemon => {
        pokemon.displayInfo();
      })
      .catch(error => console.error('Error displaying Pokemon info:', error));
  }

  // Function to add selected Pokemon to the battle
  function addToBattle() {
    const pokemonName = document.getElementById('pokemon-select').value;
    const selectElement = document.getElementById('pokemon1-select');
    const option = document.createElement('option');
    option.textContent = pokemonName;
    selectElement.appendChild(option);
  }


