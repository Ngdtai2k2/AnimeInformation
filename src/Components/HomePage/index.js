import { Button, Form } from "react-bootstrap";
import { FaFireFlameCurved, FaWandMagicSparkles } from "react-icons/fa6";
import { HiOutlineSignal } from "react-icons/hi2";
import React, { useEffect } from "react";

import Airing from "../Airing";
import Popular from "../Popular";
import Upcoming from "../Upcoming";

import "./styles.css";
import { useGlobalContext } from "../../context/global";

function Homepage() {
  const {
    handelSearch,
    search,
    isSearch,
    handleChange,
    getUpcomingAnime,
    getAiringAnime,
    getTopAnimeFavorite,
    getPopularAnime
  } = useGlobalContext();

  const [rendered, setRendered] = React.useState("popular");

  const switchComponent = () => {
    switch (rendered) {
      case "popular":
        return <Popular rendered={rendered} />;
      case "airing":
        return <Airing rendered={rendered} />;
      case "upcoming":
        return <Upcoming rendered={rendered} />;
      default:
        return <Popular rendered={rendered} />;
    }
  };

  const title = !isSearch
    ? rendered === "popular"
      ? "Popular Anime"
      : rendered === "airing"
      ? "Airing Anime"
      : "Upcoming Anime"
    : "Result search";

    useEffect(() => {
      getTopAnimeFavorite();
      getPopularAnime();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
  return (
    <>
      <div className="border-bottom mt-4 mt-md-3 pt-5">
        <div className="row my-3 my-md-4">
          <div className="col-12 col-md-6 d-flex justify-content-center mb-2 mb-md-0">
            <Button
              variant="outline-dark"
              className="p-1 me-2 d-flex justify-content-center align-items-center btn-text"
              onClick={() => {
                setRendered("popular");
              }}
            >
              <FaFireFlameCurved className="me-1" />
              Popular
            </Button>
            <Button
              variant="outline-dark"
              className="p-1 me-2 d-flex justify-content-center align-items-center btn-text"
              onClick={() => {
                setRendered("airing");
                getAiringAnime();
              }}
            >
              <HiOutlineSignal className="me-1" />
              Airing
            </Button>
            <Button
              variant="outline-dark"
              className="p-1 d-flex justify-content-center align-items-center btn-text"
              onClick={() => {
                setRendered("upcoming");
                getUpcomingAnime();
              }}
            >
              <FaWandMagicSparkles className="me-1" /> Upcoming
            </Button>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-center">
            <Form className="d-flex" action="" onSubmit={handelSearch}>
              <Form.Group className="me-2">
                <Form.Control
                  className="shadow-none border-black h-100"
                  type="text"
                  placeholder="Anime name"
                  value={search}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="success" type="submit" className="btn-text">
                Submit
              </Button>
            </Form>
          </div>
        </div>
        <h5 className="mt-0 mb-3 mb-md-4">{title}</h5>
      </div>
      <div className="container-fluid">{switchComponent()}</div>
    </>
  );
}

export default Homepage;
