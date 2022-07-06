import WelcomePage from './pages/WelcomePage/WelcomePage';
import CounterPage from './pages/CounterPage/CounterPage';
import { useState } from 'react';
import PokemonPage from './pages/PokemonPage/PokemonPage';
import PokemonsPage from './pages/PokemonsPage/PokemonsPage';
import Loginpage from './pages/LoginPage/LoginPage';
import { Routes, Route, Link, Outlet } from "react-router-dom";
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import AddNewPokemonPage from './pages/AddNewPokemonPage/AddNewPokemonPage';
import LanguageContext from './contexts/LanguageContext';

const LANGUAGES = {
  EN: "en",
  VI: "vi"
}

const App = () => {
  const [language, setLanguage] = useState(LANGUAGES.EN)
  
  const handleChangeLanguage = (evt) => {
    setLanguage(evt.target.value)
  }
  
  return (
    <LanguageContext.Provider value={ language }>
      <div className="container">
        <nav style={ { marginBottom: 45 } }>
          <Link to="/">Welcome</Link> |{ " " }
          <Link to="/counter">Counter</Link> |{ " " }
          <Link to="/pokemons">Pokemons</Link> |{ " " }
          <Link to="/login">Login</Link>
          <select value={ language } onChange={ handleChangeLanguage } style={ { marginLeft: 50 } } name="language">
            <option value={ LANGUAGES.EN }>English</option>
            <option value={ LANGUAGES.VI }>Tiếng Việt</option>
          </select>
        </nav>
        
        <Routes>
          <Route path="/" element={ <WelcomePage/> }/>
          <Route path="counter" element={ <CounterPage/> }/>
          {/*<Route path="pokemon" element={<PokemonPage />} />*/ }
          <Route path="pokemons" element={ <Outlet/> }>
            <Route
              index
              element={ <PokemonsPage/> }
            />
            <Route
              path=":pokemonId"
              element={ <PokemonPage/> }
            />
            <Route
              path="add-new"
              element={ <AddNewPokemonPage/> }
            />
          </Route>
          <Route path="login" element={ <Loginpage /> }/>
          <Route path="*" element={ <NotFoundPage/> }/>
        </Routes>
      </div>
    </LanguageContext.Provider>
  )
}

export default App;
