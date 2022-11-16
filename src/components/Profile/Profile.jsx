import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { logout, userSelector } from 'features/auth';
import { useGetListQuery } from 'services/TMDB';
import { RatedCards } from 'components';

const Profile = () => {
  const { user } = useSelector(userSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({
    listName: 'favorite/movies',
    accountId: user?.id,
    sessionId: localStorage.getItem('session_id'),
    page: 1,
  });

  const { data: watchlistMovies, refetch: refetchWatchlisted } = useGetListQuery({
    listName: 'watchlist/movies',
    accountId: user?.id,
    sessionId: localStorage.getItem('session_id'),
    page: 1,
  });

  useEffect(() => {
    refetchFavorites();
    refetchWatchlisted();
  }, []);

  const clickLogoutHandler = () => {
    dispatch(logout());
    navigate('/', { replace: true });
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Button color="inherit" onClick={clickLogoutHandler}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length ? (
        <Typography>Add favorites or watchlist some movies to see them here </Typography>
      ) : (
        <Box>
          <RatedCards movies={favoriteMovies} title="Favorite Movies" />
          <RatedCards movies={watchlistMovies} title="Watchlist Movies" />
        </Box>
      )}
    </Box>
  );
};

export default Profile;
