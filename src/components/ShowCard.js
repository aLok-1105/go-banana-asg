// src/ShowCard.js
import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

function ShowCard({ show }) {

  const cleanSummary = show.summary ? show.summary.replace(/<[^>]+>/g, '') : 'No summary available';
  const shortSummary = cleanSummary.length > 20 ? `${cleanSummary.slice(0, 300)}...` : cleanSummary;

  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardMedia
        component="img"
        height="500"
        image={show.image ? show.image.medium : 'https://via.placeholder.com/210x295?text=No+Image'}
        alt={show.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {show.name}
        </Typography>
        <Typography height="200px" variant="body2" color="text.secondary">
          {shortSummary}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ShowCard;
