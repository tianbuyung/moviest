import React from 'react';
import { Divider, List, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress, useTheme, ListItemButton } from '@mui/material';
import { NavLink } from 'react-router-dom';

const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

const demoCategories = [
  { label: 'Comedy', value: 'comedy' },
  { label: 'Action', value: 'action' },
  { label: 'Horror', value: 'horror' },
  { label: 'Animation', value: 'animation' },
];

const redLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const blueLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const Sidebar = ({ onMobileOpen }) => {
  const theme = useTheme();

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
          src={theme.palette.mode === 'light' ? redLogo : blueLogo}
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
            <ListItemButton
              onClick={() => {}}
            >
              {/* <ListItemIcon>
                <Box
                  component="img"
                  sx={{
                    filter: () => (theme.palette.mode === 'dark' ? 'invert(1)' : 'dark'),
                  }}
                  src={redLogo}
                  height="30px"
                />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItemButton>
          </Box>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {demoCategories.map(({ label, value }) => (
          <Box
            key={value}
            component={NavLink}
            to="/"
            sx={{
              color: () => theme.palette.text.primary,
              textDecoration: 'none',
            }}
          >
            <ListItemButton
              onClick={() => {}}
            >
              {/* <ListItemIcon>
                <Box
                  component="img"
                  sx={{
                    filter: () => (theme.palette.mode === 'dark' ? 'invert(1)' : 'dark'),
                  }}
                  src={redLogo}
                  height="30px"
                />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItemButton>
          </Box>
        ))}
      </List>
    </>
  );
};

export default Sidebar;
