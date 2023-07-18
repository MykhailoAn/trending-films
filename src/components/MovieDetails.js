import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cast from './Cast';
import Reviews from './Reviews';
import './css/MovieDetailsPage.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isCastVisible, setIsCastVisible] = useState(false);
  const [isReviewsVisible, setIsReviewsVisible] = useState(false);

  useEffect(() => {
    fetchMovieDetails(movieId);
    fetchMovieCast(movieId);
    fetchMovieReviews(movieId);
  }, [movieId]);

  const fetchMovieDetails = async (movieId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=6dfb3113379cd5dcbbdf4e28c76d1817`,
      );
      const data = await response.json();
      setMovieDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMovieCast = async (movieId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=6dfb3113379cd5dcbbdf4e28c76d1817`,
      );
      const data = await response.json();
      setCast(data.cast);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMovieReviews = async (movieId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=6dfb3113379cd5dcbbdf4e28c76d1817`,
      );
      const data = await response.json();
      setReviews(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleCastVisibility = () => {
    setIsCastVisible(!isCastVisible);
  };

  const toggleReviewsVisibility = () => {
    setIsReviewsVisible(!isReviewsVisible);
  };

  return (
    <div>
      <div className="movie-details-container">
        <div className="movie-details-image-container">
          <img
            src={`https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`}
            alt={movieDetails.title}
            className="movie-details-image"
          />
        </div>
        <div className="movie-details-info">
          <h1>{movieDetails.title}</h1>
          <p>User Score: {movieDetails.vote_average}</p>
          <p>
            Genres: {movieDetails.genres?.map((genre) => genre.name).join(', ')}
          </p>
          <h2>Overview:</h2>
          <p>{movieDetails.overview}</p>
        </div>
      </div>

      <div className="toggle-section">
        <h2 onClick={toggleCastVisibility} className="toggle-button">
          Cast {isCastVisible ? '(Hide)' : '(Show)'}
        </h2>
        {isCastVisible && <Cast movieId={movieId} />}

        <h2 onClick={toggleReviewsVisibility} className="toggle-button">
          Reviews {isReviewsVisible ? '(Hide)' : '(Show)'}
        </h2>
        {isReviewsVisible && <Reviews movieId={movieId} />}
      </div>
    </div>
  );
};

export default MovieDetailsPage;
