import React,{useState} from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Home from './Components/Home';
import Cart from './Components/Cart';
import Product from './Components/Product';

export const Context = React.createContext(); 

function App() {
  const [cart,setCart] = useState([]);
  
  return (
  <Context.Provider
  value={{
    cart,
    setCart
  }}>  
  <BrowserRouter>
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/product/:id" component={Product} />
    </Switch>
  </BrowserRouter>
  </Context.Provider>
  );
}

export default App;
