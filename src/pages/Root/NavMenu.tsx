import {
  AppBar,
  Container,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { Menu as MenuIcon, Logout } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import useLocalStorageState from 'use-local-storage-state';
import { useAuth } from '../../hooks/useAuth';
import { navItems } from './navItems';
import { THEME_PALETTE_KEY } from '../../utils/constants';

export function NavMenu() {
  const [themePalette, setThemePalette] = useLocalStorageState(THEME_PALETTE_KEY, { defaultValue: 'light' });
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const { isAuthenticated, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && pathname !== '/login') {
      navigate('/login');
    }
  }, [isAuthenticated, pathname]);

  function handleNavMenuOpen(event: React.MouseEvent<HTMLElement>) {
    setAnchorElNav(event.currentTarget);
  }

  function handleNavMenuClose() {
    setAnchorElNav(null);
  }

  if (!isAuthenticated) return null;
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="nav menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              sx={{ mr: 2 }}
              onClick={handleNavMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleNavMenuClose}
            >
              {navItems.map((item) => (
                <MenuItem key={item.name} onClick={() => navigate(item.path)}>
                  <Typography textAlign="center">{item.name}</Typography>
                </MenuItem>
              ))}
              <FormControlLabel
                control={
                  <Switch
                    checked={themePalette === 'dark'}
                    onChange={() => (themePalette === 'dark' ? setThemePalette('light') : setThemePalette('dark'))}
                  />
                }
                label="Dark Mode"
                labelPlacement="start"
                sx={{ pr: 2 }}
              />
            </Menu>
          </Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Flash Samurai
          </Typography>
          <IconButton size="large" color="inherit" aria-label="logout" onClick={logout}>
            <Logout />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
