import { useState } from 'react';
import './StarRating.css';

function StarRating({ rating, onRatingChange, readOnly = false }) {
 
  const [hover, setHover] = useState(0);

  return (
    <div className={`star-rating ${readOnly ? 'read-only' : ''}`}>
      {[1, 2, 3, 4, 5].map((starValue) => (
        <span
          key={starValue}
          className={starValue <= (hover || rating) ? 'star filled' : 'star'}
          onClick={() => !readOnly && onRatingChange(starValue)}
          onMouseEnter={() => !readOnly && setHover(starValue)}
          onMouseLeave={() => !readOnly && setHover(0)}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default StarRating;