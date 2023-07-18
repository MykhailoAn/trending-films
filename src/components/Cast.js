import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchCast(movieId);
  }, [movieId]);

  const fetchCast = async (movieId) => {
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

  return (
    <div>
      <h2>Cast</h2>
      <div className="cast-container">
        {cast.map((actor) => (
          <div key={actor.id} className="actor-card">
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
              className="actor-image"
            />
            <p className="actor-name">{actor.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cast;
