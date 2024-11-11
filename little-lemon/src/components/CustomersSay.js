import React from 'react';
import { Card, CardMedia, Typography } from '@mui/material';
import user1 from '../images/user1.jpg';
import user2 from '../images/user2.jpg';
import user3 from '../images/user3.jpg';
import user4 from '../images/user4.jpg';

// Sample data for cards
const cardData = [
  {
    name: "A K Marie",
    rating: 4.5,
    review: "Great product, highly recommend it!",
    image: user2
  },
  {
    name: "Sabrina Swift",
    rating: 3.8,
    review: "Good quality but could be better.",
    image: user1
  },
  {
    name: "Adolf guan",
    rating: 4.9,
    review: "Absolutely loved it! Worth the price.",
    image: user3
  },
  {
    name: "Han So jin",
    rating: 3.5,
    review: "Decent, but not my favorite.",
    image: user4
  }
];

const CustomersSay = () => (
  <main className='Testimonials'>
    <h1 className='leadtext'>Testimonials</h1>
  <div className="rating-cards-container">
    {cardData.map((item, index) => (
      <Card key={index} className="rating-card">
        <Typography className="rating">{item.rating}</Typography>
        <CardMedia
          component="img"
          alt={item.name}
          image={item.image}
          className="card-image"
        />
        <Typography className="card-name">
          {item.name}
        </Typography>
        <Typography variant="body2" className="card-review">
          {item.review}
        </Typography>
      </Card>
    ))}
  </div>
  </main>
);


export default CustomersSay;
