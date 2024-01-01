import Pagination from "react-bootstrap/Pagination";
import React from "react";
import "./styles.css";

const PaginationComponent = ({
  paginationInfo,
  getDataFunc,
  currentPage,
  lastPage,
  hasNextPage,
}) => {
  if (!paginationInfo) return null;

  const maxPagesToShow = 3;
  let items = [];

  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(lastPage, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  if (startPage > 1) {
    items.push(
      <Pagination.Item key={1} onClick={() => getDataFunc(1)}>
        1
      </Pagination.Item>
    );
    if (startPage > 2) {
      items.push(<Pagination.Ellipsis key="start-ellipsis" />);
    }
  }

  for (let number = startPage; number <= endPage; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => getDataFunc(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  if (endPage < lastPage) {
    if (endPage < lastPage - 1) {
      items.push(<Pagination.Ellipsis key="end-ellipsis" />);
    }
    items.push(
      <Pagination.Item key={lastPage} onClick={() => getDataFunc(lastPage)}>
        {lastPage}
      </Pagination.Item>
    );
  }

  const hasPreviousPage = currentPage > 1;

  const handleBackToTop = (page) => {
    getDataFunc(page);
    window.scrollTo(0, 0);
  };

  return (
    <Pagination size="sm">
      {hasPreviousPage && (
        <Pagination.Prev onClick={() => handleBackToTop(currentPage - 1)} />
      )}
      {items.map((item) =>
        React.cloneElement(item, {
          onClick: () => handleBackToTop(item.props.children),
        })
      )}
      {hasNextPage && (
        <Pagination.Next onClick={() => handleBackToTop(currentPage + 1)} />
      )}
    </Pagination>
  );
};

export default PaginationComponent;
