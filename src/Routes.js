import React,{useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'


import Index from './pages/Index/Index';
import Menu from './pages/Menu/Menu';
import Confirm from './pages/Confirm/Confirm';



const Routes = () => {

    const [data, setData] = useState({});
    
    function setParams(params) {
        setData(params)
    }
    
    return (
      <Router>
          <Switch>
  
            <Route exact path="/">
              <Index />
            </Route>
  
            <Route path="/menu">
              <Menu setParams={setParams}/>
            </Route>
  
            <Route path="/confirm">
              <Confirm data={data}/>
            </Route>
  
          </Switch>
      </Router>
    );
  }
export default Routes