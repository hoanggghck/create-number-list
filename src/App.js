import React from 'react';
import './App.css';
import './css/begin.css'
import Index from './components/Index';
import Output from './components/Output';
import Begin from './components/Begin'
import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <div className="App myHello">
      
      <BrowserRouter>
      
      <Switch>
        
       <Route path="/" exact component={Begin}/>
       <Route path="/input" exact component={Index}/>
       <Route path="/output" exact component={Output}/>
       
      </Switch>
      </BrowserRouter>
      <div className="wave wave1"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>
      <div className="wave wave4"></div>
    </div>
  );
}

export default App;
