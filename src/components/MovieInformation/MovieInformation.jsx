import React, { useState } from 'react';
import {
  Modal,
  Button,
  ButtonGroup,
  Box,
  Grid,
  CircularProgress,
  Link as LinkMaterial,
  useMediaQuery,
  Rating,
  styled,
  Typography,
} from '@mui/material';
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  ArrowBack,
} from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { useGetMovieQuery, useGetRecommendationsQuery } from 'services/TMDB';
import { selectGenreOrCategory } from 'features/currentGenreOrCategory';
import genreIcons from 'assets/genres';
import { MovieList } from 'components';

const MovieGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  margin: '10px 0 !important',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
}));

const PosterImage = styled('img')(({ theme }) => ({
  borderRadius: '20px',
  boxShadow: '0.5em 1em 1em rgb(64,64,70)',
  width: '100%',
  display: 'flex',
  [theme.breakpoints.down('lg')]: {
    margin: '0 auto',
    width: '80%',
    marginBottom: '30px',
  },
  [theme.breakpoints.down('md')]: {
    margin: '0 auto',
    width: '50%',
    marginBottom: '30px',
  },
  [theme.breakpoints.down('sm')]: {
    margin: '0 auto',
    width: '100%',
    marginBottom: '30px',
  },
}));

const CastImage = styled('img')({
  width: '100%',
  maxWidth: '7em',
  height: '8em',
  objectFit: 'cover',
  borderRadius: '10px',
});

const ButtonContainer = React.forwardRef((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Box ref={ref} component={props.component} {...props} />
));

const StyledButtonContainer = styled(ButtonContainer)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  width: '100%',
  marginBottom: '16px',
  [theme.breakpoints.down('xl')]: {
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
  },
}));

const MovieInformation = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  // eslint-disable-next-line operator-linebreak
  const { data: recommendations, isFetching: isRecommendationsFetching } =
    useGetRecommendationsQuery({
      list: '/recommendations',
      movie_id: id,
    });
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const isMovieFavorite = false;
  const isMovieWatchlisted = false;

  const addToFavorites = () => {};

  const addToWatchlist = () => {};

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/">Something has gone wrong - Go back!</Link>
      </Box>
    );
  }

  return (
    <MovieGrid container>
      <Grid item sm={12} md={8} lg={4}>
        <PosterImage
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} ({data?.release_date.split('-')[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <MovieGrid item>
          <Box display="flex" justifyContent="center">
            <Rating readOnly value={(data?.vote_average || 0) / 2} />
            <Typography variant="subtitle1" gutterBottom sx={{ marginLeft: '10px' }}>
              {data?.vote_average.toFixed(2)} / 10
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            {data?.runtime}min | Language:{' '}
            {data?.spoken_languages?.length && data?.spoken_languages[0]?.name}
          </Typography>
        </MovieGrid>
        <Grid
          item
          sx={{
            margin: '10px 0 !important',
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
          }}
        >
          {data?.genres?.map((genre) => (
            <Box
              component={Link}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: { sm: '0.5rem 1rem' },
                textDecoration: 'none',
              }}
              key={genre.id}
              to="/"
              onClick={() => dispatch(selectGenreOrCategory(genre.id))}
            >
              <Box
                component="img"
                sx={{
                  filter: (theme) => theme.palette.mode === 'dark' && 'invert(1)',
                  marginRight: '10px',
                }}
                src={genreIcons[genre.name.toLocaleLowerCase()]}
                height="30px"
              />
              <Typography color="text.primary">{genre.name}</Typography>
            </Box>
          ))}
        </Grid>
        <Typography variant="h5" gutterBottom sx={{ marginTop: '10px' }}>
          Overview
        </Typography>
        <Typography sx={{ marginBottom: '2rem' }}>{data?.overview}</Typography>
        <Typography variant="h5" gutterBottom>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {
            // eslint-disable-next-line operator-linebreak
            data &&
              data.credits?.cast
                ?.map(
                  (character) =>
                    // eslint-disable-next-line implicit-arrow-linebreak
                    character.profile_path && (
                      <Grid
                        key={character.id}
                        item
                        xs={4}
                        md={2}
                        component={Link}
                        to={`/actors/${character.id}`}
                        sx={{ textDecoration: 'none' }}
                      >
                        <CastImage
                          src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                          alt={character.name}
                        />
                        <Typography color="text.primary" align="center">
                          {character.name}
                        </Typography>
                        <Typography color="text.secondary" align="center">
                          {character.character.split('/')[0]}
                        </Typography>
                      </Grid>
                    ),
                )
                .slice(0, 6)
          }
        </Grid>
        <Grid item container sx={{ marginTop: '2rem' }}>
          <StyledButtonContainer>
            <StyledButtonContainer component={Grid} item container xs={12} sm={6}>
              <ButtonGroup
                size="medium"
                variant="outlined"
                orientation={isMobile ? 'vertical' : 'horizontal'}
              >
                <LinkMaterial
                  component={Button}
                  target="_blank"
                  rel="noopener noreferrer"
                  endIcon={<Language />}
                  href={data?.homepage}
                  sx={{ textDecoration: 'none' }}
                >
                  Website
                </LinkMaterial>
                <LinkMaterial
                  component={Button}
                  target="_blank"
                  rel="noopener noreferrer"
                  endIcon={<MovieIcon />}
                  href={`https://www.imdb.com/title/${data?.imdb_id}`}
                  sx={{ textDecoration: 'none' }}
                >
                  IMDB
                </LinkMaterial>
                <Button
                  onClick={() => {
                    setOpen(true);
                  }}
                  href="#"
                  endIcon={<Theaters />}
                >
                  Trailer
                </Button>
              </ButtonGroup>
            </StyledButtonContainer>
            <StyledButtonContainer component={Grid} item container xs={12} sm={6}>
              <ButtonGroup
                size="medium"
                variant="outlined"
                orientation={isMobile ? 'vertical' : 'horizontal'}
              >
                <Button
                  onClick={addToFavorites}
                  endIcon={isMovieFavorite ? <FavoriteBorderOutlined /> : <Favorite />}
                >
                  {isMovieFavorite ? 'Unfavorite' : 'Favorite'}
                </Button>
                <Button
                  onClick={addToWatchlist}
                  endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
                >
                  Watchlist
                </Button>
                <Button endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main' }}>
                  <Typography
                    component={Link}
                    sx={{ textDecoration: 'none' }}
                    to="/"
                    color="inherit"
                    variant="subtitle2"
                  >
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </StyledButtonContainer>
          </StyledButtonContainer>
        </Grid>
      </Grid>
      <Box
        sx={{
          marginTop: '5rem',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
        {isRecommendationsFetching && <CircularProgress size="8rem" />}
        {recommendations && !isRecommendationsFetching && recommendations.results.length ? (
          <MovieList movies={recommendations} numberOfMovies={12} />
        ) : (
          <Box>Sorry, nothing was found.</Box>
        )}
      </Box>
      <Modal
        closeAfterTransition
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {data?.videos?.results?.length && (
          <iframe
            allow="autoplay"
            allowFullScreen
            title={data.title}
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            style={{
              border: 'none',
              width: isMobile ? '90%' : '50%',
              height: isMobile ? '90%' : '50%',
            }}
          />
        )}
      </Modal>
    </MovieGrid>
  );
};

export default MovieInformation;
