import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews(movieId);
  }, [movieId]);

  const fetchReviews = async (movieId) => {
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

  return (
    <div>
      <h2>Reviews</h2>
      <ul className="reviews-list">
        {reviews.map((review) => (
          <li key={review.id} className="review-item">
            <h3 className="review-author">{review.author}</h3>
            <p className="review-content">{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
