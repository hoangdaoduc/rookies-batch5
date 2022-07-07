import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useSendGetApiRequest from '../../shared/hooks/useSendGetApiRequest';

const mapResponseToData = response => {
  return ({
    name: response.data.name,
    height: response.data.height,
    frontImg: response.data.sprites.front_default,
    backImg: response.data.sprites.back_default
  })
}

const PokemonPage = () => {
  const { pokemonId } = useParams();
  const [pokemonIdSearch, setPokemonIdSearch] = useState(pokemonId);
  const { loading, setLoading, error, data: pokemon } = useSendGetApiRequest({
    name: null,
    height: null,
    frontImg: null,
    backImg: null
  }, `https://pokeapi.co/api/v2/pokemon/${ pokemonIdSearch }`, mapResponseToData)
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPokemonIdSearch(pokemonId);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    }
  }, [pokemonId]);
  
  const getMainContent = () => {
    if (loading) {
      return <h1>Loading</h1>
    }
    return (
      <div>
        <h1>ID: { pokemonIdSearch }</h1>
        <div>Name: { pokemon.name }</div>
        <div>Height: { pokemon.height }</div>
        <div>
          <img src={ pokemon.frontImg } alt="" />
          <img src={ pokemon.backImg } alt="" />
        </div>
      </div>)
  }

  return (
    <div>
      Pokemon page
      <div>
        { getMainContent()}
        <button onClick={ () => {
          setLoading(true);
          navigate(`/pokemons/${parseInt(pokemonId) - 1}`);
        } } style={ { margin: 40 } }>Previous
        </button>
        <button onClick={ () => {
          setLoading(true);
          navigate(`/pokemons/${parseInt(pokemonId) + 1}`);
        } } style={ { margin: 40 } }>Next
        </button>
      </div>
    </div>
  );
};

export default PokemonPage;
