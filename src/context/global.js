import React, { createContext, useContext, useReducer } from "react";

const GlobalContext = createContext();

const baseUrl = "https://api.jikan.moe/v4";

const LOADING = "LOADING";
const SEARCH = "SEARCH";
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
const GET_AIRING_ANIME = "GET_AIRING_ANIME";
const GET_PICTURES = "GET_PICTURES";

const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case GET_POPULAR_ANIME:
      return {
        ...state,
        popularAnime: action.payload.animeData,
        pagination: action.payload.paginationData,
        loading: false,
      };
    case SEARCH:
      return {
        ...state,
        searchResults: action.payload.animeData,
        pagination: action.payload.paginationData,
        loading: false,
        searchQuery: action.payload.searchQuery,
      };
    case GET_UPCOMING_ANIME:
      return {
        ...state,
        upcomingAnime: action.payload.animeData,
        pagination: action.payload.paginationData,
        loading: false,
      };
    case GET_AIRING_ANIME:
      return {
        ...state,
        airingAnime: action.payload.animeData,
        pagination: action.payload.paginationData,
        loading: false,
      };
    case GET_PICTURES:
      return { ...state, pictures: action.payload, loading: false };
    default:
      return state;
  }
};

export const GlobalContextProvider = ({ children }) => {
  const intialState = {
    popularAnime: [],
    upcomingAnime: [],
    airingAnime: [],
    pictures: [],
    isSearch: false,
    searchResults: [],
    loading: false,
    pagination: null,
    searchQuery: "",
  };

  const [state, dispatch] = useReducer(reducer, intialState);
  const [search, setSearch] = React.useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      state.isSearch = false;
    }
  };

  const handelSearch = (e) => {
    e.preventDefault();
    if (search) {
      searchAnime(search);
      state.isSearch = true;  
    } else {
      state.isSearch = false;
      alert("Please enter a search term");
    }
  };

  const getPopularAnime = async (page = 1) => {
    dispatch({ type: LOADING });
    const response = await fetch(
      `${baseUrl}/top/anime?filter=bypopularity&limit=24&page=${page}`
    );
    const data = await response.json();

    dispatch({
      type: GET_POPULAR_ANIME,
      payload: {
        animeData: data.data,
        paginationData: data.pagination,
      },
    });
  };

  const getUpcomingAnime = async (page = 1) => {
    dispatch({ type: LOADING });
    const response = await fetch(
      `${baseUrl}/top/anime?filter=upcoming&limit=24&page=${page}`
    );
    const data = await response.json();
    dispatch({
      type: GET_UPCOMING_ANIME,
      payload: {
        animeData: data.data,
        paginationData: data.pagination,
      },
    });
  };

  const getAiringAnime = async (page = 1) => {
    dispatch({ type: LOADING });
    const response = await fetch(
      `${baseUrl}/top/anime?filter=airing&limit=24&page=${page}`
    );
    const data = await response.json();
    dispatch({
      type: GET_AIRING_ANIME,
      payload: {
        animeData: data.data,
        paginationData: data.pagination,
      },
    });
  };

  const searchAnime = async (anime, page = 1) => {
    dispatch({ type: LOADING });
    const response = await fetch(
      `${baseUrl}/anime?q=${anime}&limit=24&page=${page}`
    );
    const data = await response.json();
    dispatch({
      type: SEARCH,
      payload: {
        animeData: data.data,
        paginationData: data.pagination,
        searchQuery: anime,
      },
    });
  };

  const getAnimePictures = async (id) => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseUrl}/characters/${id}/pictures`);
    const data = await response.json();
    dispatch({ type: GET_PICTURES, payload: data.data });
  };

  React.useEffect(() => {
    getPopularAnime();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        handleChange,
        handelSearch,
        searchAnime,
        search,
        getPopularAnime,
        getUpcomingAnime,
        getAiringAnime,
        getAnimePictures,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
