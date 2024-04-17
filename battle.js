// // Function to fetch Pokémon data from the API
// async function fetchPokemonData(url) {
//     const response = await fetch(url);
//     const data = await response.json();
//     return data;
// }

// // Function to populate dropdown with Pokémon options
// async function populatePokemonSelect() {
//     const pokemonList = await fetchPokemonData('https://pokeapi.co/api/v2/pokemon?limit=151');
//     const selectPokemon1 = document.getElementById('selectPokemon1');
//     const selectPokemon2 = document.getElementById('selectPokemon2');

//     pokemonList.results.forEach(pokemon => {
//         const option = document.createElement('option');
//         option.text = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
//         option.value = pokemon.url;
//         selectPokemon1.add(option.cloneNode(true));
//         selectPokemon2.add(option);
//     });
// }

// // Function to calculate damage
// function calculateDamage(attacker, defender) {
//     const attack = attacker.stats[4].base_stat + attacker.stats[2].base_stat; // Attack + Special Attack
//     const defense = defender.stats[3].base_stat + defender.stats[1].base_stat * 0.8; // Defense + Special Defense
//     let damage = (attack - defense);
//     damage = Math.max(damage, 10); // Minimum damage of 10
//     return Math.round(damage);
// }

// document.addEventListener('DOMContentLoaded', function() {
//     // Event listener for the Start Battle button
//     document.getElementById('startBattle').addEventListener('click', startBattle);

//     // Event listener for the Return Home button
//     document.getElementById('returnHome').addEventListener('click', returnHome);

//     // Populate Pokémon dropdowns when the page loads
//     populatePokemonSelect();
// });

// // Function to start the battle
// function startBattle() {
//     // Disable Start Battle button during battle
//     document.getElementById('startBattle').disabled = true;

//     // Get selected Pokémon URLs
//     const selectedPokemon1Url = document.getElementById('selectPokemon1').value;
//     const selectedPokemon2Url = document.getElementById('selectPokemon2').value;

//     // Fetch Pokémon data
//     Promise.all([
//         fetchPokemonData(selectedPokemon1Url),
//         fetchPokemonData(selectedPokemon2Url)
//     ]).then(([pokemon1, pokemon2]) => {
//         // Clear previous battle details
//         document.getElementById('battleLog').innerHTML = '';

//         // Display Pokémon images and details
//         document.getElementById('pokemon1Image').src = pokemon1.sprites.front_default;
//         document.getElementById('pokemon2Image').src = pokemon2.sprites.front_default;
//         document.getElementById('pokemon1Details').innerHTML = `<p>HP: ${pokemon1.stats[5].base_stat}</p>`;
//         document.getElementById('pokemon2Details').innerHTML = `<p>HP: ${pokemon2.stats[5].base_stat}</p>`;

//         // Show both Pokémon containers
//         document.getElementById('pokemon1').style.display = 'block';
//         document.getElementById('pokemon2').style.display = 'block';

//         // Reset borders
//         document.getElementById('pokemon1').style.border = 'none';
//         document.getElementById('pokemon2').style.border = 'none';

//         // Continue with battle logic...
//         continueBattleLogic(pokemon1, pokemon2);
//     });
// }

// // Function to continue battle logic after fetching Pokémon data
// function continueBattleLogic(pokemon1, pokemon2) {
//     // Battle logic...
//     let attacker = pokemon1;
//     let defender = pokemon2;
//     let battleLog = "";

//     const battleInterval = setInterval(() => {
//         const damage = calculateDamage(attacker, defender);
//         defender.stats[5].base_stat -= damage;

//         const attackerDiv = document.getElementById(attacker === pokemon1 ? 'pokemon1' : 'pokemon2');
//         const defenderDiv = document.getElementById(attacker === pokemon1 ? 'pokemon2' : 'pokemon1');

//         // Set red border for attacking Pokemon
//         attackerDiv.style.border = '2px solid red';

//         // Remove red border for defending Pokemon
//         defenderDiv.style.border = 'none';

//         battleLog += `${attacker.name} used ${attacker.moves[0].move.name} and did ${damage} damage. ${defender.name} remaining HP: ${defender.stats[5].base_stat}.<br>`;

//         // Swap attacker and defender
//         const temp = attacker;
//         attacker = defender;
//         defender = temp;

//         // Check if battle is over
//         if (pokemon1.stats[5].base_stat <= 0 && pokemon2.stats[5].base_stat <= 0) {
//             clearInterval(battleInterval);
//             battleLog += `Empate!<br><br>`;
//             document.getElementById('battleLog').innerHTML = `<h2>Información del Combate</h2><br>` + battleLog;
//             document.getElementById('winner').innerHTML = '<h1>Empate</h1>';
//             document.getElementById('startBattle').disabled = false; // Enable Start Battle button
//             document.getElementById('newBattle').style.display = 'inline'; // Show Start New Battle button
//         } else if (pokemon1.stats[5].base_stat <= 0 || pokemon2.stats[5].base_stat <= 0) {
//             clearInterval(battleInterval);
//             const winner = pokemon1.stats[5].base_stat > 0 ? pokemon1 : pokemon2;
//             const loser = pokemon1.stats[5].base_stat <= 0 ? pokemon1 : pokemon2;
//             battleLog += `${winner.name} wins!<br><br>`;
//             document.getElementById('battleLog').innerHTML = `<h2>Battle information</h2><br>` + battleLog;
//             document.querySelector('#winner').innerHTML = `<h1>Ganador: ${winner.name}</h1><br><img src="${winner.sprites.front_default}" alt="${winner.name}" />`;
//             document.getElementById('startBattle').style.display = 'none'; // Hide Start Battle button
//             document.getElementById('newBattle').style.display = 'inline'; // Show Start New Battle button
//             document.getElementById(loser === pokemon1 ? 'pokemon1' : 'pokemon2').style.display = 'none'; // Hide loser Pokemon
//         }

//         // Display battle log
//         document.getElementById('battleLog').innerHTML = `<h2>Battle information</h2><br>` + battleLog;
//     }, 1000);

//     // Continues battle logic even if no one wins
// }

// // Function to return to the home state
// function returnHome() {
//     // Clear Pokémon images and details
//     document.getElementById('pokemon1Image').src = '';
//     document.getElementById('pokemon2Image').src = '';
//     document.getElementById('pokemon1Details').innerHTML = '';
//     document.getElementById('pokemon2Details').innerHTML = '';

//     // Clear battle log
//     document.getElementById('battleLog').innerHTML = '';

//     // Show Pokémon selection dropdowns
//     document.getElementById('selectPokemon1').style.display = 'inline';
//     document.getElementById('selectPokemon2').style.display = 'inline';

//     // Enable Pokémon selection dropdowns
//     document.getElementById('selectPokemon1').disabled = false;
//     document.getElementById('selectPokemon2').disabled = false;

//     // Hide the New Battle button
//     document.getElementById('newBattle').style.display = 'none';
// }

// // Function to start a new battle
// function startNewBattle() {
//     // Reload the page only when the "Restart Battle" button is clicked
//     location.reload();
// }

// // Event listener for the "Restart Battle" button
// document.getElementById('newBattle').addEventListener('click', startNewBattle);

// // Event listener for the Return Home button
// document.getElementById('returnHome').addEventListener('click', returnHome);

// // Populate Pokémon dropdowns when the page loads
// populatePokemonSelect();


// Function to fetch Pokémon data from the API
async function fetchPokemonData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Function to populate dropdown with Pokémon options
async function populatePokemonSelect() {
    const pokemonList = await fetchPokemonData('https://pokeapi.co/api/v2/pokemon?limit=151');
    const selectPokemon1 = document.getElementById('selectPokemon1');
    const selectPokemon2 = document.getElementById('selectPokemon2');

    pokemonList.results.forEach(pokemon => {
        const option = document.createElement('option');
        option.text = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        option.value = pokemon.url;
        selectPokemon1.add(option.cloneNode(true));
        selectPokemon2.add(option);
    });
}

// Function to calculate damage
function calculateDamage(attacker, defender) {
    const attack = attacker.stats[4].base_stat + attacker.stats[2].base_stat; // Attack + Special Attack
    const defense = defender.stats[3].base_stat + defender.stats[1].base_stat * 0.8; // Defense + Special Defense
    let damage = (attack - defense);
    damage = Math.max(damage, 10); // Minimum damage of 10
    return Math.round(damage);
}

document.addEventListener('DOMContentLoaded', function() {
    // Event listener for the Start Battle button
    document.getElementById('startBattle').addEventListener('click', startBattle);

    // Event listener for the Return Home button
    document.getElementById('returnHome').addEventListener('click', returnHome);

    // Populate Pokémon dropdowns when the page loads
    populatePokemonSelect();
});

// Function to start the battle
function startBattle() {
    // Disable Start Battle button during battle
    document.getElementById('startBattle').disabled = true;

    // Get selected Pokémon URLs
    const selectedPokemon1Url = document.getElementById('selectPokemon1').value;
    const selectedPokemon2Url = document.getElementById('selectPokemon2').value;

    // Fetch Pokémon data
    Promise.all([
        fetchPokemonData(selectedPokemon1Url),
        fetchPokemonData(selectedPokemon2Url)
    ]).then(([pokemon1, pokemon2]) => {
        // Clear previous battle details
        document.getElementById('battleLog').innerHTML = '';

        // Display Pokémon images and details
        document.getElementById('pokemon1Image').src = pokemon1.sprites.front_default;
        document.getElementById('pokemon2Image').src = pokemon2.sprites.front_default;
        document.getElementById('pokemon1Details').innerHTML = `<p>HP: ${pokemon1.stats[5].base_stat}</p>`;
        document.getElementById('pokemon2Details').innerHTML = `<p>HP: ${pokemon2.stats[5].base_stat}</p>`;

        // Show both Pokémon containers
        document.getElementById('pokemon1').style.display = 'block';
        document.getElementById('pokemon2').style.display = 'block';

        // Reset borders
        document.getElementById('pokemon1').style.border = 'none';
        document.getElementById('pokemon2').style.border = 'none';

        // Continue with battle logic...
        continueBattleLogic(pokemon1, pokemon2);
    });
}

// Function to continue battle logic after fetching Pokémon data
function continueBattleLogic(pokemon1, pokemon2) {
    // Battle logic...
    let attacker = pokemon1;
    let defender = pokemon2;
    let battleLog = "";

    const battleInterval = setInterval(() => {
        const damage = calculateDamage(attacker, defender);
        defender.stats[5].base_stat -= damage;

        const attackerDiv = document.getElementById(attacker === pokemon1 ? 'pokemon1' : 'pokemon2');
        const defenderDiv = document.getElementById(attacker === pokemon1 ? 'pokemon2' : 'pokemon1');

        // Set red border for attacking Pokemon
        //attackerDiv.style.border = '2px solid red';
        attackerDiv.style.border = 'none'; // Elimina el borde existente
        attackerDiv.style.backgroundImage = "url(image/destello.PNG)";// Establece la imagen de fondo
        attackerDiv.style.backgroundSize = "80%"; // Establece el tamaño de la imagen de fondo al 80% del tamaño del elemento
        attackerDiv.style.backgroundRepeat = "no-repeat"; // Evita que la imagen de fondo se repita
        attackerDiv.style.backgroundPosition = "center"; // Centra la imagen de fondo dentro del elemento

        // Remove red border for defending Pokemon
        defenderDiv.style.border = 'none';

        battleLog += `${attacker.name} used ${attacker.moves[0].move.name} and did ${damage} damage. ${defender.name} remaining HP: ${defender.stats[5].base_stat}.<br>`;

        // Swap attacker and defender
        const temp = attacker;
        attacker = defender;
        defender = temp;

        // Check if battle is over
        if (pokemon1.stats[5].base_stat <= 0 && pokemon2.stats[5].base_stat <= 0) {
            clearInterval(battleInterval);
            battleLog += `Empate!<br><br>`;
            document.getElementById('battleLog').innerHTML = `<h2>Información del Combate</h2><br>` + battleLog;
            document.getElementById('winner').innerHTML = '<h1>Empate</h1>';
            document.getElementById('startBattle').disabled = false; // Enable Start Battle button
            document.getElementById('newBattle').style.display = 'inline'; // Show Start New Battle button
        } else if (pokemon1.stats[5].base_stat <= 0 || pokemon2.stats[5].base_stat <= 0) {
            clearInterval(battleInterval);
            const winner = pokemon1.stats[5].base_stat > 0 ? pokemon1 : pokemon2;
            const loser = pokemon1.stats[5].base_stat <= 0 ? pokemon1 : pokemon2;
            battleLog += `${winner.name} wins!<br><br>`;
            document.getElementById('battleLog').innerHTML = `<h2>Battle information</h2><br>` + battleLog;
            document.querySelector('#winner').innerHTML = `<h1>Ganador: ${winner.name}</h1><br><img src="${winner.sprites.front_default}" alt="${winner.name}" />`;
            document.getElementById('startBattle').style.display = 'none'; // Hide Start Battle button
            document.getElementById('newBattle').style.display = 'inline'; // Show Start New Battle button
            document.getElementById(loser === pokemon1 ? 'pokemon1' : 'pokemon2').style.display = 'none'; // Hide loser Pokemon
        }

        // Display battle log
        document.getElementById('battleLog').innerHTML = `<h2>Battle information</h2><br>` + battleLog;
    }, 1000);

    // Continues battle logic even if no one wins
}

// Function to return to the home state
function returnHome() {
    // Clear Pokémon images and details
    document.getElementById('pokemon1Image').src = '';
    document.getElementById('pokemon2Image').src = '';
    document.getElementById('pokemon1Details').innerHTML = '';
    document.getElementById('pokemon2Details').innerHTML = '';

    // Clear battle log
    document.getElementById('battleLog').innerHTML = '';

    // Show Pokémon selection dropdowns
    document.getElementById('selectPokemon1').style.display = 'inline';
    document.getElementById('selectPokemon2').style.display = 'inline';

    // Enable Pokémon selection dropdowns
    document.getElementById('selectPokemon1').disabled = false;
    document.getElementById('selectPokemon2').disabled = false;

    // Hide the New Battle button
    document.getElementById('newBattle').style.display = 'none';
}

// Function to start a new battle
function startNewBattle() {
    // Reload the page only when the "Restart Battle" button is clicked
    location.reload();
}

// Event listener for the "Restart Battle" button
document.getElementById('newBattle').addEventListener('click', startNewBattle);

// Event listener for the Return Home button
document.getElementById('returnHome').addEventListener('click', returnHome);

// Populate Pokémon dropdowns when the page loads
populatePokemonSelect();

// Función para mover el Pokémon hacia adelante cuando se inicia la batalla
function movePokemonForward(pokemonElement) {
    let currentLeft = parseFloat(pokemonElement.style.left || 0);
    const movementDistance = 200; // Cambia este valor para ajustar la distancia de movimiento

    function move() {
        if (currentLeft < movementDistance) {
            currentLeft += 1; // Ajusta la velocidad de movimiento cambiando este valor
            pokemonElement.style.left = currentLeft + "px";
            requestAnimationFrame(move);
        }
    }

    move();
}

// Función para mover el Pokémon hacia atrás a su posición original cuando la batalla termina
function movePokemonBack(pokemonElement) {
    let currentLeft = parseFloat(pokemonElement.style.left || 0);

    function move() {
        if (currentLeft > 0) {
            currentLeft -= 1; // Ajusta la velocidad de movimiento cambiando este valor
            pokemonElement.style.left = currentLeft + "px";
            requestAnimationFrame(move);
        }
    }

    move();
}

// Función para animar el movimiento del Pokémon
function animatePokemon(pokemonElement, startX, endX) {
    let currentX = startX;
    const duration = 1000; // Duración de la animación en milisegundos

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1); // Limitar el porcentaje a 1
        currentX = startX + (endX - startX) * percentage;
        pokemonElement.style.left = currentX + "px";

        if (percentage < 1) {
            // Continuar la animación
            animationFrameId = requestAnimationFrame(step);
        }
    }

    let startTime;
    animationFrameId = requestAnimationFrame(step);
}

// Ataque del Pokémon 1
document.getElementById("startBattle").addEventListener("click", function() {
    movePokemonForward(pokemon1);
    // Después de un tiempo, regresar el Pokémon a su posición original
    setTimeout(function() {
        movePokemonBack(pokemon1);
    }, 1500); // Ajusta este valor según la duración de la animación de ida
});

// Ataque del Pokémon 2
document.getElementById("startBattle").addEventListener("click", function() {
    movePokemonForward(pokemon2);
    // Después de un tiempo, regresar el Pokémon a su posición original
    setTimeout(function() {
        movePokemonBack(pokemon2);
    }, 1500); // Ajusta este valor según la duración de la animación de ida
});


