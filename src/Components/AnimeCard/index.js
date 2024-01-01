import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React from 'react';

import StarRating from '../StarRating';

import "./styles.css";

const AnimeCard = ({ link, keyLink, sourceImage, score, scoredBy, animeTitle }) => {
  return (
    <Link
      className="col-12 col-md-6 col-lg-4 text-decoration-none mb-3"
      to={link}
      key={keyLink}
    >
      <Card className="m-2 p-2 h-100">
        <Card.Img
          variant="top"
          src={sourceImage}
          className="card-image"
          alt=""
        />
        <Card.Body className="my-0 py-2 mx-0 px-0">
          <Card.Title className="my-0 card-text d-flex justify-content-start mb-2 fw-bold">
            {animeTitle}
          </Card.Title>
          <StarRating score={score} scoredBy={scoredBy} />
        </Card.Body>
      </Card>
    </Link>
  );
};

export default AnimeCard;
