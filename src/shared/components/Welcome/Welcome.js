import { useContext } from 'react';
import LanguageContext from '../../contexts/LanguageContext';

const Welcome = ({ name, age, color }) => {
  const language = useContext(LanguageContext);
  
  return (
    <div style={ { backgroundColor: color } }>
      <h1>{ language === "en" ? "Hello" : "Xin chào" } { name }</h1>
      <h2>Age: { age }</h2>
    </div>
  )
};

export default Welcome;
