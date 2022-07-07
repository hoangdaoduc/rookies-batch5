import { useCallback, useMemo, useState } from "react"
import useSendGetApiRequest from '../../shared/hooks/useSendGetApiRequest';


const PokemonsPage = () => {
  const mapResponseToData = useCallback(response => response.data.results, []);
  const { loading, data: pokemons, error, setLoading } = useSendGetApiRequest([],
    "https://pokeapi.co/api/v2/pokemon?offset=100&limit=1000", mapResponseToData)
  const [pokemonTextSeach, setPokemonTextSeach] = useState("");
  const [sortByNameState, setSortByNameState] = useState(null); // "ASC" or "DESC"
  
  const handleSearchChange = useCallback(evt => {
    setPokemonTextSeach(evt.target.value)
  }, []);
  
  const pokemonsFiltered = useMemo(() => {
    return pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(pokemonTextSeach.toLowerCase()));
  }, [pokemonTextSeach, pokemons]);
  
  const pokemonsSorted = useMemo(() => {
    const getPokemonsSorted = () => {
      if (sortByNameState === null) return pokemonsFiltered;
      if (sortByNameState === "ASC") return pokemonsFiltered.sort((pokemonA, pokemonB) => {
        if (pokemonA.name.toLowerCase() < pokemonB.name.toLowerCase()) return -1;
        if (pokemonA.name.toLowerCase() > pokemonB.name.toLowerCase()) return 1;
        return 0;
      })
      if (sortByNameState === "DESC") return pokemonsFiltered.sort((pokemonA, pokemonB) => {
        if (pokemonA.name.toLowerCase() < pokemonB.name.toLowerCase()) return 1;
        if (pokemonA.name.toLowerCase() > pokemonB.name.toLowerCase()) return -1;
        return 0;
      })
    }
    return getPokemonsSorted();
  }, [pokemonsFiltered, sortByNameState])
  
  const handleNameClick = () => {
    console.log("click ....")
    if (sortByNameState === null) {
      setSortByNameState("ASC");
      return;
    }
    if (sortByNameState === "ASC") {
      setSortByNameState("DESC");
      return;
    }
    setSortByNameState(null)
  }
  
  console.log("sortByNameState = ", sortByNameState)
  if (loading) {
    return <div>Loading</div>
  }
  return (
    <>
      <input
        style={ { margin: 20, display: "block" } }
        placeholder="Search for pokemons ..."
        value={ pokemonTextSeach }
        onChange={ handleSearchChange }
      />
      <table>
        <thead>
        <tr>
          <th onClick={ handleNameClick }>Name ({ sortByNameState === null ? "None" : sortByNameState })</th>
          <th>Url</th>
        </tr>
        </thead>
        <tbody>
        { pokemonsSorted.map(pokemon => (
          <tr key={ pokemon.url }>
            <td>{ pokemon.name }</td>
            <td><a href={ pokemon.url }>{ pokemon.url }</a></td>
          </tr>
        )) }
        </tbody>
      
      </table>
    </>
  )
}

export default PokemonsPage;
