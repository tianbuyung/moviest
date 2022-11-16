import React from 'react';
import { Grid, styled } from '@mui/material';

import { Movie } from 'components';

const CustomGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  overflow: 'auto',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
  },
}));

const MovieList = ({ movies, numberOfMovies }) => (
  <CustomGrid container>
    {movies?.results.slice(0, numberOfMovies).map((movie, i) => (
      <Movie key={i} movie={movie} i={i} />
    ))}
  </CustomGrid>
);

export default MovieList;
