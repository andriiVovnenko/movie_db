
const getPopularMovies = async (page) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=cd046006b327b84370dbdbf9ae25abfc&language=en-US&page=${page}`);//.then(response => response.json());//.then(data => data.results.map(v => v));
    const data = await response.json();
    //return (data.results.filter(v => v.genre_ids.includes(18)));
    return data.results;

};

const getSearchingMovies = async (keyword) => {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=cd046006b327b84370dbdbf9ae25abfc&language=en-US&query=${keyword}&page=1&include_adult=false`)
    const data = await response.json();
    return (data.results);
};

const getMovieDetails = async (id) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=cd046006b327b84370dbdbf9ae25abfc&language=en-US`);
    return await response.json();
};

const getSimilarMovies = async (id) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=cd046006b327b84370dbdbf9ae25abfc&language=en-US&page=1`);
    return await response.json();
};

const getGenresList = async () => {
  const response = await fetch(" https://api.themoviedb.org/3/genre/movie/list?api_key=cd046006b327b84370dbdbf9ae25abfc&language=en-US");
  return await response.json();
};

const getKeyIframe = async (id) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=cd046006b327b84370dbdbf9ae25abfc&language=en-US`);
    return await response.json();
};
export  {getPopularMovies, getSearchingMovies, getMovieDetails, getSimilarMovies, getGenresList, getKeyIframe};