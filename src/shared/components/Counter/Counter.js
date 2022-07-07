import "./Counter.css";
import { useState, useEffect } from 'react';
const Counter = () => {
  const [value, setValue] = useState(0);
  const handleMinusButtonClick = () => {
    setValue(value - 1);
  };
  const handleAddButtonClick = () => {
    setValue(value + 1);
  }
  console.log("Counter render with value = ", value);
  
  useEffect(()=>{
    console.log("Effect change title running")
    document.title = `Counter: ${value}`
  })
  
  return (
    <div>
      <button onClick={ handleMinusButtonClick } className="counter__btn">-</button>
      <span className="counter__value">{ value }</span>
      <button onClick={ handleAddButtonClick } className="counter__btn">+</button>
    </div>
  )
}

export default Counter;
