import React, { useRef } from 'react';
import { Box, CssBaseline, styled } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Movies, Profile, MovieInformation, Actors, Navbar } from 'components';
import useAlan from 'useAlan';

const RootStyles = styled(Box)({
  display: 'flex',
  height: '100%',
});

const ToolbarStyles = styled(Box)({
  height: '70px',
});

const ContentStyles = styled(Box)({
  flexGrow: 1,
  padding: '2em',
  width: '100%',
});

const App = () => {
  const alanBtnContainer = useRef();

  useAlan();

  return (
    <>
      <CssBaseline />
      <RootStyles>
        <Navbar />
        <ContentStyles component="main">
          <ToolbarStyles />
          <Routes>
            <Route path="/" element={<Movies />} />
            <Route path="/approved" element={<Navigate to="/" replace />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/movie/:id" element={<MovieInformation />} />
            <Route path="/actors/:id" element={<Actors />} />
          </Routes>
        </ContentStyles>
      </RootStyles>
      <div ref={alanBtnContainer} />
    </>
  );
};

export default App;
