import { useState, MouseEvent } from 'react'
import reactLogo from './assets/react.svg'
import List from '@mui/material/List';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import UserIcon from './components/UserIcon';
import './App.css'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { NavaItems } from './const/NavabarItem';
import { Outlet, Link } from "react-router-dom";
import {AuthProvider } from './utils/AuthProvider';

const drawerWidth: number = 0;
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


function App() {
  // const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: MouseEvent<HTMLElement>,
    index: number,
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    
    <div className="App">
      <AuthProvider>
      <AppBar position="absolute" open={open}>
        <Stack direction="row" spacing={2}>
        <List
            component="nav"
            aria-label="Device settings"
            sx={{ bgcolor: 'background.paper' }}
          >
            <ListItem
              button
              id="lock-button"
              aria-haspopup="listbox"
              aria-controls="lock-menu"
              aria-label="when device is locked"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClickListItem}
            >
              <ListItemText
                primary=""
                secondary={NavaItems[selectedIndex-1].label}
              />
            </ListItem>
          </List>
          <Grid container justifyContent="flex-end">
            <UserIcon></UserIcon>
        </Grid>
          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'lock-button',
              role: 'listbox',
            }}
          >
            {NavaItems.map((option, index) => (
              <MenuItem
                key={option.id}
                disabled={index === 0}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, option.id)}
              >
                {option.label}
              </MenuItem>
            ))}
          </Menu>
        </Stack>
        <Outlet />
    </AppBar>
    </AuthProvider>
    </div>
    
  )
}

export default App
