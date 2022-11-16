import React from 'react';
import { Box, Typography } from '@mui/material';
import { Movie } from 'components';

const RatedCards = ({ movies, title }) => (
  <Box>
    <Typography variant="h5" gutterBottom>
      {title}
    </Typography>
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {movies?.results.map((movie, i) => (
        <Movie key={movie.id} movie={movie} i={i} />
      ))}
    </Box>
  </Box>
);

export default RatedCards;
