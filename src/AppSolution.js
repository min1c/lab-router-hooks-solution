import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import * as C from './FilmConstants'
import { Films } from './FilmsHookSolution';

const App = () => {

  // 1. Modify the behaviour of the Navbar.Brand and Nav.Link elements to behave as a react-router <NavLink>.
  //    Using <NavLink> will not trigger a full page refresh when navigating within a router. 
  //    Hint: Use 'as' attribute
  // 2. Replace the current <Home> return with  two <Route> components within a <Switch> component
  //    a. The first route will render the <Films> component if the path is "/films"
  //    b. The second route will render the <Home> component if the path is "/"

  return (
    <div>
      <Router>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand as={NavLink} to="/home">Lab 3 (Router)</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to="/home">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/films">Films</Nav.Link>
          </Nav>
        </Navbar>
        <Switch>
          <Route path="/films" component={Films} />
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router> 
    </div>
  );
}

export default App;

const Home = () => {
  return (
    <Container>
      <h3 className="display-3">Home</h3>
      <p>This lab aims to apply the basics of:</p>
      <ul>
        <li>event-binding</li>
        <li>state</li>
        <li>lifecycle methods</li>
        <li>routing</li>
      </ul>
      <ol>
        {C.INCOMPLETE_1_HTML}<br/>
        {C.INCOMPLETE_2_HTML}<br/>
        {C.INCOMPLETE_3_HTML}
      </ol>
    </Container>);
}
