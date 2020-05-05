import React, { useEffect, useState } from "react";
import {
  useParams
} from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import * as C from './FilmConstants'

export function FilmDetails() {



  // LAB SECTION BEGINS ---------------------------------------------------------------------------

  // 1. Create a variable called 'id' which captures the :id from the Route using one of the 
  //    react-router hooks
  const { id } = useParams();

  // 2. Change the 'film' variable by using one of the react hooks
  const [film, setFilm] = useState({});

  // 3. Write an effect hook to fetch the film details from 
  //    https://ghibliapi.herokuapp.com/films/<id>. Store the response json into 'film'
  //    This effect should be run ever time the film changes
  useEffect(() => {
    const fetchFilm = async () => {
      const response = await fetch(`https://ghibliapi.herokuapp.com/films/` + id);
      const json = await response.json();
      setFilm(json);
    };
    fetchFilm();
  }, [id]);

  // LAB SECTION ENDS -----------------------------------------------------------------------------

  const [filmChildren, setFilmChildren] = useState({});

  useEffect(() => {
    function generateChildren() {
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
        setFilmChildren(prevObject => { return {...prevObject, [key]: formattedValue} });
      })
    }
    if (Object.keys(film).length > 0) {
      setFilmChildren({});
      generateChildren();
    }
  }, [film]);

  const filmElements = Object.keys(film).map( key => {
    let content = ""
    if (key in C.KEY_LABELS) {
      let formattedValue = !filmChildren[key]? "Loading..." : Array.isArray(filmChildren[key]) ? JSON.stringify(filmChildren[key], null, 2) : filmChildren[key];
      content = (<>
        <Col as="dt" lg="3">{C.KEY_LABELS[key]}</Col>
        <Col as="dd" lg="9">{formattedValue}</Col>
      </>);
    }
    return <React.Fragment key={key}>{content}</React.Fragment>;
  })

  return (
    <>
      <h4 className="display-4">{film.title}</h4>
      <br/>
      <Row as="dl">
        { filmElements.length > 0 ? filmElements : C.INCOMPLETE_FILM_DETAILS }
      </Row>
    </>
  );
}

async function fetchChildren(url) {
  const promises = url.map(async item => {
    const response = await fetch(item + '?fields=name');
    return response.json();
  });
  return Promise.all(promises).then(function(value) { 
    value.forEach(json => delete json['length']); 
    return value;
  });
}