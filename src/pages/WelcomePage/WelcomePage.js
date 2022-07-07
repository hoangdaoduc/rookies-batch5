import React from 'react';
import Welcome from '../../shared/components/Welcome/Welcome';

const people = [{
  id: "1",
  name: "Son Tung",
  age: 25,
  color: "green"
}, {
  id: "2",
  name: "Maria",
  age: 35,
  color: "red"
}, {
  id: "3",
  name: "Osaka",
  age: 15,
  color: "yellow"
}
]
const WelcomePage = () => {
  console.log("Welcome page render")
  return (
    <div>
      { people.map((person) => (
        <Welcome
          key= { person.id }
          name= { person.name}
          age= { person.age }
          color= { person.color }
        />
      ))}
    </div>
  );
};

export default WelcomePage;
