import React, { useEffect, useState } from "react";
import {
  useParams
} from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import * as C from './FilmConstants'

export const FilmDetails = ({ onIdChange }) => {

  // 1. Create a variable called 'id' which captures the :id from the Route using one of the react-router hooks
  // 2. Add state: 
  //    a. Make 'film' stateful with an initial state of an empty object
  //    b. Make 'filmChildren' stateful with an initial state of an empty object
  // 3. Add effects:
  //    a. Write an effect hook for 'film' to fetch the film details using the provided fetchFilm function and set it when id is changed
  //    b. Write an effect hook for 'filmChildren' to format the film details using the provided generateChildren function when film is changed
  // 4. Add an event handler inside the film effect to use the provided onIdChange function
  //    - Modify the effect to run when onIdChange is changed along with id

  const { id } = useParams();
  const [film, setFilm] = useState({});
  const [filmChildren, setFilmChildren] = useState({});

  useEffect(() => {
    const fetch = async () => {
      const film = await fetchFilm(id);
      setFilm(film);
    };
    const handleChange = id => {
      onIdChange(id);
    }

    fetch(id);
    handleChange(id);
    
    return () => handleChange("");
  }, [id, onIdChange]);

  useEffect(() => {
    if (film && Object.keys(film).length > 0) {
      generateChildren(film, setFilmChildren);
    }
  }, [film]);

  const filmElements = getFilmElements(film, filmChildren);
  
  return (
    <>
      <h4 className="display-4">{ !film ? "Part 3 Incomplete" : film.title ? film.title : ""}</h4>
      <br/>
      <Row as="dl">
        { !film ? C.INCOMPLETE_3_FULL : filmElements.length > 0 ? filmElements : <></> }
      </Row>
    </>
  );
};

const fetchFilm = async id => {
  const response = await fetch(`${C.API_URL}/${id}`);
  return response.json();
}

const fetchChildren = async url => {
  const promises = url.map(async item => {
    const response = await fetch(item + '?fields=name');
    return response.json();
  });
  return Promise.all(promises).then(function(value) { 
    value.forEach(json => delete json['length']); 
    return value;
  });
}

const getFilmElements = (film, filmChildren) => {
  film = film ? film : {};
  return Object.keys(film).map( key => {
    if (key in C.KEY_LABELS) {
      let formattedValue = !filmChildren[key] 
          ? "Loading..." 
          : Array.isArray(filmChildren[key]) 
          ? filmChildren[key].map((item, index) => ( <React.Fragment key={`${filmChildren[key]}-${index}`}>{item.name}<br/></React.Fragment> )) 
          : filmChildren[key];
      return (        
        <React.Fragment key={key}>
          <Col as="dt" lg="3">{C.KEY_LABELS[key]}</Col>
          <Col as="dd" lg="9">{formattedValue}</Col>
        </React.Fragment>
      );
    }
    return <React.Fragment key={key}></React.Fragment>;
  })
};

const generateChildren = (film, updateFunction) => {
  updateFunction({});
  Object.entries(film).map( async ([key, value]) => {
    let formattedValue = value;
    if (value instanceof Array) {
      if (value.length !== 1  || value[0].lastIndexOf('/') !== value[0].length - 1) {
        formattedValue = await fetchChildren(value);
      }
      else {
        formattedValue = "None are currently available in the database";
      }
    }
    updateFunction(prevFilmChildren => { return {...prevFilmChildren, [key]: formattedValue} });
  })
}
