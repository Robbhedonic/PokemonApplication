// document.addEventListener("DOMContentLoaded", function() {
//     fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
//     .then(response => response.json())
//     .then(data => {
//         const pokemonList = data.results;
//         const gallery = document.getElementById('gallery');

//         pokemonList.forEach(pokemon => {
//             fetch(pokemon.url)
//             .then(response => response.json())
//             .then(pokemonData => {
//                 const card = document.createElement('div');
//                 card.classList.add('card');

//                 const name = document.createElement('h3');
//                 name.textContent = pokemonData.name;

//                 const image = document.createElement('img');
//                 image.src = pokemonData.sprites.front_default;
//                 image.alt = pokemonData.name;

//                 const types = document.createElement('p');
//                 types.textContent = `Type(s): ${pokemonData.types.map(type => type.type.name).join(', ')}`;

//                 const abilities = document.createElement('p');
//                 abilities.textContent = `Abilities: ${pokemonData.abilities.map(ability => ability.ability.name).join(', ')}`;

//                 const stats = document.createElement('p');
//                 stats.textContent = 'Base Stats:';
//                 pokemonData.stats.forEach(stat => {
//                     stats.textContent += `\n${stat.stat.name}: ${stat.base_stat}`;
//                 });

//                 const height = document.createElement('p');
//                 height.textContent = `Height: ${pokemonData.height / 10} m`;

//                 const weight = document.createElement('p');
//                 weight.textContent = `Weight: ${pokemonData.weight / 10} kg`;

//                 card.appendChild(name);
//                 card.appendChild(image);
//                 card.appendChild(types);
//                 card.appendChild(abilities);
//                 card.appendChild(stats);
//                 card.appendChild(height);
//                 card.appendChild(weight);

//                 gallery.appendChild(card);
//             });
//         });
//     })
//     .catch(error => console.log(error));
// });


// function sortBy() {
//     const sortBy = document.getElementById('sort').value;
//     const gallery = document.getElementById('gallery');
//     const cards = Array.from(gallery.getElementsByClassName('card'));

//     const [criteria, order] = sortBy.split('-');

//     switch (criteria) {
//         case 'power':
//             cards.sort((a, b) => order === 'asc' ? a.dataset.power - b.dataset.power : b.dataset.power - a.dataset.power);
//             break;
//         case 'weight':
//             cards.sort((a, b) => order === 'asc' ? a.dataset.weight - b.dataset.weight : b.dataset.weight - a.dataset.weight);
//             break;
//         case 'height':
//             cards.sort((a, b) => order === 'asc' ? a.dataset.height - b.dataset.height : b.dataset.height - a.dataset.height);
//             break;
//         case 'type':
//             cards.sort((a, b) => order === 'asc' ? a.dataset.type.localeCompare(b.dataset.type) : b.dataset.type.localeCompare(a.dataset.type));
//             break;
//         case 'hp':
//             cards.sort((a, b) => order === 'asc' ? a.dataset.hp - b.dataset.hp : b.dataset.hp - a.dataset.hp);
//             break;
//         default:
//             break;
//     }

//     cards.forEach(card => gallery.appendChild(card));

document.addEventListener("DOMContentLoaded", function() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(response => response.json())
    .then(data => {
        const pokemonList = data.results;
        const gallery = document.getElementById('gallery');

        pokemonList.forEach(pokemon => {
            fetch(pokemon.url)
            .then(response => response.json())
            .then(pokemonData => {
                const card = document.createElement('div');
                card.classList.add('card');

                // Añadir atributos de datos a la tarjeta
                card.dataset.power = pokemonData.stats.reduce((acc, curr) => acc + curr.base_stat, 0);
                card.dataset.weight = pokemonData.weight;
                card.dataset.height = pokemonData.height;
                card.dataset.type = pokemonData.types.map(type => type.type.name).join(', ');
                card.dataset.hp = pokemonData.stats.find(stat => stat.stat.name === 'hp').base_stat;

                const name = document.createElement('h3');
                name.textContent = pokemonData.name;

                const image = document.createElement('img');
                image.src = pokemonData.sprites.front_default;
                image.alt = pokemonData.name;

                const types = document.createElement('p');
                types.textContent = `Type(s): ${pokemonData.types.map(type => type.type.name).join(', ')}`;

                const abilities = document.createElement('p');
                abilities.textContent = `Abilities: ${pokemonData.abilities.map(ability => ability.ability.name).join(', ')}`;

                const stats = document.createElement('p');
                stats.textContent = 'Base Stats:';
                pokemonData.stats.forEach(stat => {
                    stats.textContent += `\n${stat.stat.name}: ${stat.base_stat}`;
                });

                const height = document.createElement('p');
                height.textContent = `Height: ${pokemonData.height / 10} m`;

                const weight = document.createElement('p');
                weight.textContent = `Weight: ${pokemonData.weight / 10} kg`;

                card.appendChild(name);
                card.appendChild(image);
                card.appendChild(types);
                card.appendChild(abilities);
                card.appendChild(stats);
                card.appendChild(height);
                card.appendChild(weight);

                gallery.appendChild(card);
            });
        });
    })
    .catch(error => console.log(error));
});

function sortBy() {
    const sortBy = document.getElementById('sort').value;
    console.log('sortBy:', sortBy); // Verificar el valor de sortBy
    
    const gallery = document.getElementById('gallery');
    const cards = Array.from(gallery.getElementsByClassName('card'));

    console.log('Before sorting:', cards); // Verificar los datos de las tarjetas antes de ordenarlas
    
    const [criteria, order] = sortBy.split('-');

    cards.sort((a, b) => {
        let aValue, bValue;

        switch (criteria) {
            case 'power':
                aValue = Number(a.dataset.power);
                bValue = Number(b.dataset.power);
                break;
            case 'weight':
                aValue = Number(a.dataset.weight);
                bValue = Number(b.dataset.weight);
                break;
            case 'height':
                aValue = Number(a.dataset.height);
                bValue = Number(b.dataset.height);
                break;
            case 'type':
                aValue = a.dataset.type;
                bValue = b.dataset.type;
                break;
            case 'hp':
                aValue = Number(a.dataset.hp);
                bValue = Number(b.dataset.hp);
                break;
            default:
                break;
        }

        if (order === 'asc') {
            if (aValue < bValue) return -1;
            if (aValue > bValue) return 1;
            return 0;
        } else {
            if (aValue < bValue) return 1;
            if (aValue > bValue) return -1;
            return 0;
        }
    });

    console.log('After sorting:', cards); // Verificar los datos de las tarjetas después de ordenarlas
    
    // Limpiar el contenedor de la galería
    gallery.innerHTML = '';

    // Añadir las tarjetas ordenadas de vuelta al contenedor
    cards.forEach(card => gallery.appendChild(card));
}

// Agregar evento change al select para activar sortBy() cuando se cambie la opción de ordenamiento
document.getElementById('sort').addEventListener('change', sortBy);