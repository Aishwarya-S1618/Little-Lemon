import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import greekSalad from '../images/greek_salad.jpg';
import bruchetta from '../images/bruchetta.svg';
import lemonDessert from '../images/lemon_dessert.jpg';
import { MdDeliveryDining } from "react-icons/md";

const items = [
  {
    title: "Greek Salad",
    description: "A healthy mix of fresh vegetables, olives, and feta cheese.A healthy mix of fresh vegetables, olives, and feta cheese.A healthy mix of fresh vegetables, olives, and feta cheese.",
    image: greekSalad,
  },
  {
    title: "Bruschetta",
    description: "Toasted bread topped with fresh tomatoes, basil, and olive oil.",
    image: bruchetta,
  },
  {
    title: "Lemon Dessert",
    description: "A refreshing lemon dessert to cleanse the palate.A refreshing lemon dessert to cleanse the palate.A refreshing lemon dessert to cleanse the palate.A refreshing lemon dessert to cleanse the palate.",
    image: lemonDessert,
  },
];

export default function Specials() {
  return (
  <main id="menu">
  <div className= "specials">
  <span className="specials-nav">
   <span className='typefaces'> This weeks specials !</span>
   <button id="orderonline" className="reserve-button leadtext">Online Menu</button>
  </span>
    <main className="specials-container">
      {items.map((item, index) => (
        <Card key={index} sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', borderRadius: '16px 16px 0 0'}}>
          <CardMedia
            component="img"
            alt={item.title}
            height="140"
            image={item.image}
            sx={{
                border: "solid black 1px",
                borderRadius: '16px 16px 0 0',
                width: "calc(100% - 2px)", // Adjust width to account for border
              }}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography className="sectiontitle" variant="h5" component="div">
              {item.title}
            </Typography>
            <Typography className="paragraphtext" variant="body2" sx={styles.description}>
              {item.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" sx ={styles.button}>Order a delivery <MdDeliveryDining style={{ height: '1.5rem', width: '1.5rem' }}/></Button>
          </CardActions>
        </Card>
      ))}
    </main>
    </div>
  </main>
  );
}

const styles = {
  description: {
    color: 'text.secondary',
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3, // Limits text to 3 lines with ellipses
    textOverflow: 'ellipsis',
  },
  button: {
    color: '#333333',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  }
};
