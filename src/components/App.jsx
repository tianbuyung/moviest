import React from 'react';
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

import { Movies, Profile, MovieInformation, Actors, Navbar } from 'components';

const App = () => (
  <div>
    <CssBaseline />
    <Navbar />
    <main>
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/movie/:id" element={<MovieInformation />} />
        <Route path="/actors/:id" element={<Actors />} />
      </Routes>
    </main>
  </div>
);

export default App;
