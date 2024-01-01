import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import React from "react";

import { useGlobalContext } from "../../context/global";

import "./styles.css";

function Sidebar() {
  const { popularAnime } = useGlobalContext();

  const sorted = popularAnime?.sort((a, b) => {
    return b.score - a.score;
  });

  return (
    <>
      <Col xs="12" md="3">
        <h4 className="d-flex justify-content-center">Top 5 Popular</h4>
        {sorted?.slice(0, 5).map((anime) => {
          return (
            <Link
              to={`/anime/${anime.mal_id}`}
              key={anime.mal_id}
              className="text-reset text-decoration-none mb-3"
            >
              <div className="position-relative image-card-wrapper">
                <img
                  src={anime.images.jpg.large_image_url}
                  alt=""
                  className="img-fluid image-card"
                />
                <div className="position-absolute translate-middle rounded-circle circle-overlay d-flex justify-content-center align-items-center">
                  {anime.score}
                </div>
              </div>
              <h6 className="mb-4 mb-md-2 fw-bold mt-1 px-4">{anime.title}</h6>
            </Link>
          );
        })}
      </Col>
    </>
  );
}

export default Sidebar;
