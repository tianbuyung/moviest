import React, { useEffect, useState } from 'react';
import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  Button,
  Avatar,
  styled,
  useMediaQuery,
  Box,
} from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';

import { Search, Sidebar } from 'components';
import { fetchToken, moviesApi, createSessionId } from 'utils';
import { setUser, userSelector } from 'features/auth';

const CustomToolbar = styled(Toolbar)(({ theme }) => ({
  height: '80px',
  display: 'flex',
  justifyContent: 'space-between',
  marginLeft: '240px',
  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,
    flexWrap: 'wrap',
  },
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  outline: 'none',
  marginRight: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));

const drawerWidth = '240px';

const CustomDrawer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    width: drawerWidth,
    flexShrink: 0,
  },
}));

const NavBar = () => {
  const { isAuthenticated, user } = useSelector(userSelector);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  const dispatch = useDispatch();

  const token = localStorage.getItem('request_token');
  const sessionIdFromLocalStorage = localStorage.getItem('session_id');

  useEffect(() => {
    const loginUser = async () => {
      if (token) {
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionIdFromLocalStorage}`,
          );
          dispatch(setUser(userData));
        } else {
          const sessionId = await createSessionId();
          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`);
          dispatch(setUser(userData));
        }
      }
    };

    loginUser();
  }, [token]);

  return (
    <>
      <AppBar position="fixed">
        <CustomToolbar>
          {isMobile && (
            <MenuButton
              color="inherit"
              edge="start"
              onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
            >
              <Menu />
            </MenuButton>
          )}
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => {}}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <Box>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={NavLink}
                to={`/profile/${user.id}`}
                onClick={() => {}}
                sx={{
                  '&:hover': {
                    color: 'white !important',
                    textDecoration: 'none',
                  },
                }}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  sx={{ width: '30px', height: '30px' }}
                  alt="Profile"
                  src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                />
              </Button>
            )}
          </Box>
          {isMobile && <Search />}
        </CustomToolbar>
      </AppBar>
      <Box>
        <CustomDrawer component="nav">
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              ModalProps={{ keepMounted: true }}
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              sx={{
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                },
              }}
            >
              <Sidebar onMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              variant="permanent"
              open
              sx={{
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                },
              }}
            >
              <Sidebar onMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </CustomDrawer>
      </Box>
    </>
  );
};

export default NavBar;
