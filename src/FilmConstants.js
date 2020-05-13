import React from 'react';
import Col from 'react-bootstrap/Col'

export const API_URL = 'https://ghibliapi.herokuapp.com/films';

export const KEY_LABELS = {
  'title': 'Title',
  'description': 'Description',
  'director': 'Director',
  'producer': 'Producer',
  'release_date': 'Release Date',
  'rt_score': 'Rotten Tomatoes Score',
  'people': 'People',
  'species': 'Species',
  // 'locations': 'Locations',
  // 'vehicles': 'Vehicles',
}

export const INCOMPLETE_1_HTML = (
  <>
    <li>In <strong>App.js</strong>:</li>
    <ol>
      <li>
        {`Modify the behaviour of the Navbar.Brand and Nav.Link elements to behave as a react-router <NavLink>.`}<br/>
        <ul>
          <li>{`Using <NavLink> will not trigger a full page refresh when navigating within a router.`}</li>
          <li>{`Hint: Use 'as' attribute`}</li>
        </ul>
      </li>
      <li>
        {`Replace the current <Home> return with  two <Route> components within a <Switch> component`}
        <ol type="a">
          <li>{`The first route will render the <Films> component if the path is "/films"`}</li>
          <li>{`The second route will render the <Home> component if the path is "/"`}</li>
        </ol>
      </li>
    </ol>
  </>
);

export const INCOMPLETE_2_HTML = (
  <>
    <li>In <strong>FilmsHook.js</strong>:</li>
    <ol>
      <li>{`Create a variable called 'match' which captures the route match object`}</li>
      <li>{`Add state:`}
        <ol type="a">
          <li>{`Make 'id' stateful with an initial state of an empty string`}</li>
          <li>{`Make 'films' stateful with an initial state of an empty list`}</li>
        </ol>
      </li>
      <li>{`Write an effect hook for 'films' to fetch film list using the provided fetchFilms function and set it only once upon initialization`}</li>
      <li>{`Replace { C.INCOMPLETE_2_FULL } with  two <Route> components within a <Switch> component`}
        <ol type="a">
          <li>{`The first route will render the <FilmDetails> component if the path is exactly the match path + "/:id"`}</li>
          <li>{`The second route will render { C.SELECT_FILM } if the path is the match path`}</li>
        </ol>
      </li>
      <li>{`Add a callback hook to handle id change`}
        <ol type="a">
          <li>{`It should accept selectedId and set the "id" state to selectedId`}</li>
          <li>{`It should be memoized only once (at initialization)`}</li>
          <li>{`Pass it as a prop called onIdChange to the FilmDetails component in the route you created in the previous step`}</li>
          <li>{`Add a "className" property to the ListGroup.Item elements that will conditionally set the class to "active" or "" depending if the state id matches the element's film.id`}</li>
        </ol>
      </li>
    </ol>
  </>
);

export const INCOMPLETE_3_HTML = (
  <>
    <li>In <strong>FilmDetailsHook.js</strong>:</li>
    <ol>
      <li>{`Create a variable called 'id' which captures the :id from the Route using one of the react-router hooks`}</li>
      <li>{`Add state:`}
        <ol type="a">
          <li>{`Make 'film' stateful with an initial state of an empty object`}</li>
          <li>{`Make 'filmChildren' stateful with an initial state of an empty object`}</li>
        </ol>
      </li>
      <li>{`Add effects:`}
        <ol type="a">
          <li>{`Write an effect hook for 'film' to fetch the film details using the provided fetchFilm function and set it when id is changed`}</li>
          <li>{`Write an effect hook for 'filmChildren' to format the film details using the provided generateChildren function when film is changed`}</li>
        </ol>
      </li>
      <li>{`Add an event handler inside the film effect to use the provided onIdChange function`}
        <ul>
          <li>{`Modify the effect to run when onIdChange is changed along with id`}</li>
        </ul>
      </li>
    </ol>
  </>
);

export const INCOMPLETE_2_FULL = (
  <>
    <Col as="dt" lg="3">Goals</Col>
    <Col as="dd" lg="9">
      <li>Display film list</li>
      <li>Set up routing using the film list to get film details</li>
    </Col>
    <Col as="dt" lg="3">Instructions</Col>
    <Col as="dd" lg="9">{INCOMPLETE_2_HTML}</Col>
  </>
);

export const INCOMPLETE_3_FULL = (
  <>
    <Col as="dt" lg="3">Goals</Col>
    <Col as="dd" lg="9">
      <li>Display film details</li>
      <li>Highlight selected film in film list</li>
    </Col>
    <Col as="dt" lg="3">Instructions</Col>
    <Col as="dd" lg="9">{INCOMPLETE_3_HTML}</Col>
  </>
);

export const SELECT_FILM = (
  <h4 className="display-4">
    <i>Please select a film.</i>
  </h4> 
);
