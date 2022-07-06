import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const PokemonPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [pokemon, setPokemon] = useState({
    name: null,
    height: null,
    frontImg: null,
    backImg: null
  });
  /*const [pokemonId, setPokemonId] = useState(1);*/
  const { pokemonId } = useParams();
  const [pokemonIdSearch, setPokemonIdSearch] = useState(pokemonId);
  const navigate = useNavigate();


  useEffect(() => {
    let didCancel = false;
    axios.get(`https://pokeapi.co/api/v2/pokemon/${ pokemonIdSearch }`)
      .then(response => {
        console.log("response = ", response);
        if (!didCancel) {
          console.log("set new state")
          setLoading(false)
          setPokemon({
            name: response.data.name,
            height: response.data.height,
            frontImg: response.data.sprites.front_default,
            backImg: response.data.sprites.back_default
          })
        }
      })
      .catch(() => {
        if (!didCancel) {
          setLoading(false);
          setError("Something went wrong")
        }
      });
    return () => {
      console.log("clean up effect");
      didCancel = true;
    }
  }, [pokemonIdSearch]);

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
          /*setPokemonId(pokemonId - 1)*/
        } } style={ { margin: 40 } }>Previous
        </button>
        <button onClick={ () => {
          setLoading(true);
          navigate(`/pokemons/${parseInt(pokemonId) + 1}`);
          /*setPokemonId(pokemonId + 1)*/
        } } style={ { margin: 40 } }>Next
        </button>
      </div>
    </div>
  );
};

export default PokemonPage;
