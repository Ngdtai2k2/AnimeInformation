import React from "react";

import AnimeCard from "../AnimeCard";

function AnimeList({ animeList, isSearch, searchResults, renderedType }) {
  const conditionalRender = () => {
    if (!isSearch && renderedType) {
      return animeList?.map((anime) => (
        <AnimeCard
          link={`/anime/${anime.mal_id}`}
          key={anime.mal_id}
          sourceImage={anime.images.jpg.large_image_url}
          score={anime.score}
          scoredBy={anime.scored_by}
          animeTitle={anime.title}
        />
      ));
    } else {
      return searchResults?.map((anime) => (
        <AnimeCard
          link={`/anime/${anime.mal_id}`}
          key={anime.mal_id}
          sourceImage={anime.images.jpg.large_image_url}
          score={anime.score}
          scoredBy={anime.scored_by}
          animeTitle={anime.title}
        />
      ));
    }
  };

  return (
    <>
      <div className="d-flex flex-wrap">{conditionalRender()}</div>
    </>
  );
}

export default AnimeList;
