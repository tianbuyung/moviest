import React from 'react';
import { Typography, Grid, Grow, Tooltip, Rating, styled, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const CustomGrid = styled(Grid)(({ theme }) => ({
  padding: '10px',
}));

const CustomTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  textOverflow: 'ellipsis',
  width: '230px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  marginTop: '10px',
  marginBottom: '0',
  textAlign: 'center',
}));

const Movie = ({ movie, i }) => {
  console.log(movie, i);

  return (
    <CustomGrid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Grow in key={i} timeout={(i + 1) * 250}>
        <Box
          component={Link}
          to={`/movie/${movie.id}`}
          sx={{
            alignItems: 'center',
            fontWeight: 'Bolder',
            textDecoration: 'none',
            display: { xs: 'flex' },
            flexDirection: { xs: 'column' },
            '&:hover': {
              cursor: 'pointer',
            },
          }}
        >
          <Box
            component="img"
            alt={movie.title}
            src={movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : 'https://www.fillmurray.com/200/300'}
            sx={{
              borderRadius: '20px',
              height: '300px',
              marginBottom: '10px',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />
          <CustomTypography variant="h5">
            {movie.title}
          </CustomTypography>
          <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
            <div>
              <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
            </div>
          </Tooltip>
        </Box>
      </Grow>
    </CustomGrid>
  );
};

export default Movie;
