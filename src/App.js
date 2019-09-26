import React from 'react';
import logo from './logo.svg';
import './App.css';

import Index from './components/Index';
import Output from './components/Output';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Test from './components/text';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      
      <Switch>
       <Route path="/" exact component={Index}/>
       <Route path="/output" exact component={Output}/>
       <Route path="/text" exact component={Test}/>
       
       

      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
