import React from "react";

//routers
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

//components
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import AboutMe from './AboutMe';
import Porfolio from './Porfolio';

function Layout() {

  return (
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/aboutme/" component={AboutMe} />
          <Route exact path="/porfolio/" component={Porfolio} />
          <Route path="*" render={()=> <Redirect to="/"/>} />
        </Switch>
        <Footer/>
      </Router>
  )
}

export default Layout;