import { fetchHandler } from './fetchHelpers';
import { IResponse, Pokemon, PokemonBasic } from './index.interface';
const pokemonListEl = document.getElementsByClassName('pokemon-list')[0];
const step = 1;
const paginationEl = document.getElementsByClassName('paginations')[0];

function onClickHandler(url: string) {
  fetch(url)
    .then((res) => res.json())
    .then((pokemon) => {
      console.log(pokemon);
    });
}

function setPokemon({
  name,
  url,
  abilities,
  is_default,
  weight,
  moves,
}: Pokemon) {
  const pokemonListItem = document.createElement('li');
  const movesEl = document.createElement('div');
  movesEl.className = 'moves';
  pokemonListItem.className = 'pokemon-list-item';

  const [{ move, version_group_details }, ...rest] = moves;
  pokemonListItem.textContent = name;
  pokemonListItem.id = name;

  movesEl.innerHTML += `<div class="${move.name}"> <span>
  First move: <strong>${move.name}</strong>
  </span>
      </div>`;

  pokemonListItem.onclick = () => onClickHandler(url);
  pokemonListItem.append(movesEl);
  pokemonListEl.append(pokemonListItem);
}

fetchHandler(
  `https://pokeapi.co/api/v2/pokemon?offset=${(step - 1) * 10}&limit=20`
)
  .then((res: Response) => res.json())
  .then(({ count, previous, next, results }: IResponse) => {
    document.getElementById('count').textContent = `${count}`;
    const pokemonInfoBase = results.reduce((prev, { name, url }) => {
      prev = { ...prev, [name]: url };
      return prev;
    }, {});
    Promise.all(results.map(({ url }: PokemonBasic) => fetch(url)))
      .then((responses) => {
        return Promise.all(responses.map((response) => response.json()));
      })
      .then((pokemonData) => {
        pokemonData.forEach((pokemon: Pokemon) => {
          setPokemon({ ...pokemon, url: pokemonInfoBase[pokemon.name] });
        });
      });
  })
  .catch((error) => {
    pokemonListEl.innerHTML = `<h1>Sorry, but we can find and pokemon</h1><span>If you ask what is problem -->  error is : ${error}</span>`;
  });
