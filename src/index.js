import { createRoot } from 'react-dom/client';
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById("app")).render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
);



/*const shareTask12 = param => {
  task1(param);
  task2(param);
}
const doSomething1 = () => {
  shareTask12("abc")
  task3();
};

const doSomething2 = () => {
  shareTask12("xyz")
  task4("zzxzxhhsd", 66676);
}

doSomething1();
doSomething2();*/




