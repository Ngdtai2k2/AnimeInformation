import { Col, Row, Spinner } from "react-bootstrap";
import React from "react";

import { useGlobalContext } from "../../context/global";
import AnimeList from "../AnimeList";
import PaginationComponent from "../PaginationComponent";
import Sidebar from "../SideBar";

import "./styles.css";

function Popular({ rendered }) {
  const {
    popularAnime,
    isSearch,
    searchResults,
    getPopularAnime,
    pagination,
    searchAnime,
    searchQuery,
  } = useGlobalContext();
  return (
    <>
      {pagination ? (
        <Row className="justify-content-center my-3 mx-0">
          <Col xs="12" md="9">
            <AnimeList
              animeList={popularAnime}
              isSearch={isSearch}
              searchResults={searchResults}
              renderedType={rendered === "popular"}
            />
            <div className="d-flex justify-content-center">
              {isSearch ? (
                <PaginationComponent
                  paginationInfo={pagination}
                  getDataFunc={(page) => searchAnime(searchQuery, page)}
                  currentPage={pagination.current_page}
                  lastPage={pagination.last_visible_page}
                  hasNextPage={pagination.has_next_page}
                />
              ) : (
                <PaginationComponent
                  paginationInfo={pagination}
                  getDataFunc={getPopularAnime}
                  currentPage={pagination.current_page}
                  lastPage={pagination.last_visible_page}
                  hasNextPage={pagination.has_next_page}
                />
              )}
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

export default Popular;
