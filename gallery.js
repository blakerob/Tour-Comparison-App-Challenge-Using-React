// U92725213

import React, { useState, useEffect } from 'react';
import './Gallery.css';

const Gallery = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch('https://course-api.com/react-tours-project');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTours(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  const removeTour = (id) => {
    setTours(tours.filter(tour => tour.id !== id));
  };

  const toggleReadMore = (id) => {
    setTours(tours.map(tour => {
      if (tour.id === id) {
        return { ...tour, readMore: !tour.readMore };
      }
      return tour;
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="gallery">
      {tours.map(tour => (
        <div key={tour.id} className="tour">
          <img src={tour.image} alt={tour.name} />
          <div className="tour-info">
            <h2>{tour.name}</h2>
            <p>
              {tour.readMore ? tour.info : `${tour.info.substring(0, 200)}...`}
              <button onClick={() => toggleReadMore(tour.id)}>
                {tour.readMore ? 'Show Less' : 'Read More'}
              </button>
            </p>
            <button onClick={() => removeTour(tour.id)}>Not Interested</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
