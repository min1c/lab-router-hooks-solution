import React, { useEffect, useState, useCallback } from "react";
import {
  Link,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import * as C from './FilmConstants'
import { FilmDetails } from './FilmDetailsHookSolution';

export const Films = () => {

  // 1. Create a variable called 'match' which captures the route match object
  // 2. Add state: 
  //    a. Make 'id' stateful with an initial state of an empty string
  //    b. Make 'films' stateful with an initial state of an empty list
  // 3. Write an effect hook for 'films' to fetch film list using the provided fetchFilms function and set it only once upon initialization
  // 4. Replace { C.INCOMPLETE_2_FULL } with  two <Route> components within a <Switch> component
  //    a. The first route will render the <FilmDetails> component if the path is exactly the match path + "/:id"
  //    b. The second route will render { C.SELECT_FILM } if the path is the match path
  // 5. Add a callback hook to handle id change
  //    a. It should accept selectedId and set the "id" state to selectedId
  //    b. It should be memoized only once (at initialization)
  //    c. Pass it as a prop called onIdChange to the FilmDetails component in the route you created in the previous step
  //    d. Add a "className" property to the ListGroup.Item elements that will conditionally set the class to "active" or "" depending if the state id matches the element's film.id
  
  const match = useRouteMatch();
  const [id, setId] = useState("");
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const films = await fetchFilms();
      setFilms(films);
    };
    fetch();
  }, []);

  const handleIdChange = useCallback((selectedId) => {
    setId(selectedId);
  }, []);

  return (
    <Container>
      <h3 className="display-3" style={{'marginBottom': '10px'}}>
        Ghibli Films
      </h3>
      <Row>
        <Tab.Container id="film-list-container">
          <Row>
            <div style={{'height': '70vh', 'overflowY': 'auto', 'padding': 0}}>
              <ListGroup id="filmList">
                {
                  films.map(film =>  {
                    return (
                      <ListGroup.Item as={ Link } key={ film.id } action variant='light'
                                      to={ `${match.url}/${film.id}` }
                                      className={ id && id === film.id? "active" : ""}
                                      >
                        {film.title}
                      </ListGroup.Item>
                    );
                  })
                }
              </ListGroup>
            </div >
            <Col style={{'height': '70vh', 'overflowY': 'auto'}}>
              <Tab.Content>
                <Switch>
                  <Route exact path={`${match.path}/:id`} render={(props) => <FilmDetails {...props} onIdChange={handleIdChange} />} />
                  <Route path={`${match.path}`}>
                    { C.SELECT_FILM }
                  </Route>
                </Switch>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Row>
    </Container>
  );
}

const fetchFilms = async () => {
  const response = await fetch(`${C.API_URL}?fields=id,title`);
  return response.json();
}
