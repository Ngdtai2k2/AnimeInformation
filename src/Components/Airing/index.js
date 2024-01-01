import { Col, Row, Spinner } from "react-bootstrap";
import React from "react";

import { useGlobalContext } from "../../context/global";
import AnimeList from "../AnimeList";
import PaginationComponent from "../PaginationComponent";
import Sidebar from "../SideBar";

function Airing({ rendered }) {
  const { airingAnime, isSearch, searchResults, getAiringAnime, pagination } =
    useGlobalContext();

  return (
    <>
      {pagination ? (
        <Row className="justify-content-center my-3 mx-0">
          <Col xs="12" md="9">
            <AnimeList
              animeList={airingAnime}
              isSearch={isSearch}
              searchResults={searchResults}
              renderedType={rendered === "airing"}
            />
            <div className="d-flex justify-content-center">
              <PaginationComponent
                paginationInfo={pagination}
                getDataFunc={getAiringAnime}
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

export default Airing;
