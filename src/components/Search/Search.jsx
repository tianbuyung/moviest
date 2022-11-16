import React, { useState } from 'react';
import { TextField, InputAdornment, Box, styled, useTheme, useMediaQuery } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { searchMovie } from 'features/currentGenreOrCategory';

const SearchContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
}));

const Search = () => {
  const [query, setQuery] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const location = useLocation();

  if (location.pathname !== '/') return null;

  const handelKeyPress = (e) => {
    if (e.key === 'Enter') {
      dispatch(searchMovie(query));
    }
  };

  return (
    <SearchContainer>
      <TextField
        onKeyPress={handelKeyPress}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant="standard"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          sx: {
            color: theme.palette.mode === 'light' ? 'black' : 'white',
            filter: theme.palette.mode === 'light' ? 'invert(1)' : 'white',
            marginTop: isMobile ? '-30px' : '0px',
            marginBottom: isMobile ? '-10px' : '0px',
            maxWidth: isMobile ? '100%' : '100%',
          },
        }}
      />
    </SearchContainer>
  );
};

export default Search;
