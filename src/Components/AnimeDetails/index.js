import { Container, Image, Row, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import "./styles.css";

function AnimeDetails() {
  const { id } = useParams();

  //state
  const [anime, setAnime] = useState({});
  const [characters, setCharacters] = useState([]);
  const [showMore, setShowMore] = useState(false);

  //destructure anime
  const {
    title,
    synopsis,
    trailer,
    duration,
    aired,
    season,
    images,
    rank,
    score,
    scored_by,
    popularity,
    status,
    rating,
    source,
  } = anime;

  //get anime based on id
  const getAnime = async (anime) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`);
    const data = await response.json();
    setAnime(data.data);
  };

  //get characters
  const getCharacters = async (anime) => {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime/${anime}/characters`
    );
    const data = await response.json();
    setCharacters(data.data);
  };

  //initial render
  useEffect(() => {
    getAnime(id);
    getCharacters(id);
  }, [id]);

  return (
    <>
      {anime ? (
        <Container className="my-md-5 my-4 pt-5 pt-md-4">
          <Row md={3} xs={12} className="image-detail-wrapper">
            <Image
              src={
                images?.webp.large_image_url
                  ? images?.jpg.large_image_url
                  : images?.webp.large_image_url
              }
              className="image-detail pt-2"
              alt=""
            />
          </Row>
          <Row md={9} xs={12}>

          </Row>
        </Container>
      ) : (
        <Row className="justify-content-center my-5 pt-5">
          <Spinner animation="border" />
        </Row>
      )}
    </>
  );
}

export default AnimeDetails;
