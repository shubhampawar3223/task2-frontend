import React,{useState} from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Home from './Components/Home';
import Cart from './Components/Cart';
import Product from './Components/Product';
import Orders from './Components/Orders';

function App() {  
  return (
  <BrowserRouter>
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/product/:id" component={Product} />
        <Route exact path="/orders" component={Orders} />
    </Switch>
  </BrowserRouter>
  );
}

export default App;
