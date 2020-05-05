import React from 'react';
import Col from 'react-bootstrap/Col'

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

export const INCOMPLETE_FILM_DETAILS = <><Col as="dt" lg="3">Lab</Col><Col as="dd" lg="9">Incomplete</Col></>;

export function SelectFilmScreen() {
  return (
    <h4 className="display-4">
      <i>Please select a film.</i>
    </h4> 
  );
}