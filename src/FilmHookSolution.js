import React, { useEffect, useState } from "react";
import {
  Link,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import * as C from './FilmConstants'
import { FilmDetails } from './FilmDetailsHookSolution';

export function Films() {

  const match = useRouteMatch();

  // LAB SECTION BEGINS ---------------------------------------------------------------------------

  // 1. Change the 'id' variable to capture the :id from the Route using one of the react-router hooks
  const { id } = useParams();

  // 2. Change the 'films' variable by using one of the react hooks
  const [films, setFilms] = useState([]);

  // 3. Write an effect hook to fetch the list of films from 
  //    https://ghibliapi.herokuapp.com/films?fields=id,title. Store the response json into 'films'
  //    This effect should be run only once at the beginning
  useEffect(() => {
    const fetchFilms = async () => {
      const response = await fetch(`https://ghibliapi.herokuapp.com/films?fields=id,title`);
      const json = await response.json();
      setFilms(json); 
    }
    fetchFilms();
  }, []);

  // LAB SECTION CONINUES BELOW -------------------------------------------------------------------

  return (
    <Container>
      <h3 className="display-3" style={{'marginBottom': '10px'}}>
        Ghibli Films
      </h3>
      <Row>
        <Tab.Container id="film-list-container">
          <Row>
            <Col md="3" lg="auto" style={{'height': '70vh', 'overflowY': 'auto', 'padding': 0}}>
              <ListGroup id="filmList">
                {
                  films.map(film =>  {
                    return (
                      <ListGroup.Item as={ Link }
                                      key={ film.id }
                                      action
                                      variant='light'
                                      to={ id ? `${film.id}` : `${match.url}/${film.id}` }
                                      className={ (id !== null && film.id === id)? "active" : "" }>
                        {film.title}
                      </ListGroup.Item>
                    );
                  })
                }
              </ListGroup>
            </Col>
            <Col md="9" lg style={{'height': '70vh', 'overflowY': 'auto'}}>
              <Tab.Content>
                {
                  // LAB SECTION CONINUES ---------------------------------------------------------
                  
                  // 4. Replace the current C.SelectFilmScreen return with  two <Route> components 
                  //    within a <Switch> component
                  // a. The first route will render <C.SelectFilmScreen /> if a film is not selected
                  // b. The second route will render <Film Details />  if a film is selected. Make
                  //    sure to pass a reference to the film id.
                }
                <Switch>
                  <Route exact path={`${match.path.slice(0, match.path.lastIndexOf('/'))}`}>
                    <C.SelectFilmScreen />
                  </Route>
                  <Route path={`${match.path.slice(0, match.path.lastIndexOf('/'))}/:id`}>
                    <FilmDetails />
                  </Route>
                </Switch>
                {
                  // LAB SECTION ENDS -------------------------------------------------------------
                }
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Row>
    </Container>
  );
}
