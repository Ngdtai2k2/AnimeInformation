import { Col, Row, Spinner } from "react-bootstrap";
import React from "react";

import { useGlobalContext } from "../../context/global";
import AnimeList from "../AnimeList";
import PaginationComponent from "../PaginationComponent";
import Sidebar from "../SideBar";

import "./styles.css";

function Upcoming({ rendered }) {
  const {
    upcomingAnime,
    isSearch,
    searchResults,
    pagination,
    getUpcomingAnime,
  } = useGlobalContext();
  return (
    <>
      {pagination ? (
        <Row className="justify-content-center my-3 mx-0">
          <Col xs="12" md="9">
            <AnimeList
              animeList={upcomingAnime}
              isSearch={isSearch}
              searchResults={searchResults}
              renderedType={rendered === "upcoming"}
            />
            <div className="d-flex justify-content-center">
              <PaginationComponent
                paginationInfo={pagination}
                getDataFunc={getUpcomingAnime}
                currentPage={pagination.current_page}
                lastPage={pagination.last_visible_page}
                hasNextPage={pagination.has_next_page}
              />
            </div>
          </Col>
          <Sidebar />
        </Row>
      ) : (
        <Row className="justify-content-center my-5 pt-5">
          <Spinner animation="border" />
        </Row>
      )}
    </>
  );
}

export default Upcoming;
