import React, { useEffect } from 'react';
import {
  Divider,
  List,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
  useTheme,
  ListItemButton,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectGenreOrCategory } from 'features/currentGenreOrCategory';
import { useGetGenresQuery } from 'services/TMDB';
import genreIcons from 'assets/genres';

const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

// eslint-disable-next-line operator-linebreak
const redLogo =
  'https://firebasestorage.googleapis.com/v0/b/binar-e-commerce-007.appspot.com/o/moviest%2FLogo%20Moviest%20red.png?alt=media&token=c2b98ab1-1331-4336-8bc1-c0bed6364fbc';
// eslint-disable-next-line operator-linebreak
const blueLogo =
  'https://firebasestorage.googleapis.com/v0/b/binar-e-commerce-007.appspot.com/o/moviest%2FLogo%20Moviest%20blue.png?alt=media&token=7bc5b105-b607-436f-b4a8-31801a886ff1';

const Sidebar = ({ onMobileOpen }) => {
  const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCategory);
  const theme = useTheme();
  const { data, isFetching } = useGetGenresQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    onMobileOpen(false);
  }, [genreIdOrCategoryName]);

  return (
    <>
      <Box
        component={NavLink}
        to="/"
        sx={{ display: 'flex', justifyContent: 'center', padding: '10% 0' }}
      >
        <Box
          component="img"
          sx={{ width: '70%' }}
          src={theme.palette.mode === 'light' ? blueLogo : redLogo}
          alt="Filmpire logo"
        />
      </Box>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Box
            key={value}
            component={NavLink}
            to="/"
            sx={{
              color: () => theme.palette.text.primary,
              textDecoration: 'none',
            }}
          >
            <ListItemButton onClick={() => dispatch(selectGenreOrCategory(value))}>
              <ListItemIcon>
                <Box
                  component="img"
                  sx={{
                    filter: () => theme.palette.mode === 'dark' && 'invert(1)',
                  }}
                  src={genreIcons[label.toLowerCase()]}
                  height="30px"
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </Box>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          data?.genres.map(({ name, id }) => (
            <Box
              key={name}
              component={NavLink}
              to="/"
              sx={{
                color: () => theme.palette.text.primary,
                textDecoration: 'none',
              }}
            >
              <ListItemButton onClick={() => dispatch(selectGenreOrCategory(id))}>
                <ListItemIcon>
                  <Box
                    component="img"
                    sx={{
                      filter: () => theme.palette.mode === 'dark' && 'invert(1)',
                    }}
                    src={genreIcons[name.toLowerCase()]}
                    height="30px"
                  />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </Box>
          ))
        )}
      </List>
    </>
  );
};

export default Sidebar;
