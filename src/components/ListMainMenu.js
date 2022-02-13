import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import HomeIcon from '@mui/icons-material/Home';
import {ReactComponent as StakeIcon} from '../images/stake.svg';
import {ReactComponent as DocsIcon} from '../images/docs.svg';
import {ReactComponent as SocialIcon} from '../images/social.svg';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import {ReactComponent as DiscordIcon} from '../images/discord.svg';
import {ReactComponent as MediumIcon} from '../images/medium.svg';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import {useState, useEffect, useRef} from 'react';
import Box from '@mui/material/Box';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
    },
  },
}));

function SubListItemButton(props) {
  return(
    <ListItemButton 
      component = "a"
      href = {props.url}
      target="_blank"
      sx={{ pl: 2 }}>
      <ListItemIcon>
        {props.icon}
      </ListItemIcon>
      <ListItemText primary={props.title} />
    </ListItemButton>
  );
}

const socialTheme = createTheme({
  palette: {
    white: {
      main: "#f0f0f0"
    }, 
    mode: 'dark',
  },
});

function SocialPopupMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  let ref = useRef(null);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <a>
      <ThemeProvider
        theme={socialTheme}
      >
      <Button 
        id='demo-customized-button'
        color="white"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        ref={ref}
      >
        Social
      </Button>
        <Menu
          id="demo-customized-menu"
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
        <MenuItem onClick={handleClose} disableRipple>
          <SubListItemButton 
            title = "Telegram" 
            url = "https://t.me/titano_finance"
            icon = {<TelegramIcon />}
          />
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <SubListItemButton 
            title = "Twitter" 
            url = "https://twitter.com/TitanoFinance"
            icon = {<TwitterIcon />}
          />
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <SubListItemButton 
            title = "Discord" 
            url = "https://discord.gg/xxdS792B7q"
            icon = {<DiscordIcon fill='white' width='24px' height='24px'/>}
          />
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <SubListItemButton 
            title = "Medium" 
            url = "https://titano.medium.com/"
            icon = {<MediumIcon fill='white' width='24px' height='24px'/>}
          />
        </MenuItem>
        </Menu>
      </ThemeProvider>
    </a>
  );
}

function ListMainMenu() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360}}
      component = "ul"
      className = "vertical-bar clearfix dsk"
    >
      <ThemeProvider
        theme={createTheme({
          palette: {
            mode: 'dark',
          },
        })}
      >
      <Paper elevation={0} sx={{ maxWidth: 256, backgroundColor: 'inherit' }}>
      <ListItemButton component="a">
        <ListItemIcon >
          <HomeIcon fill='white' width='24px' height='24px'/>
        </ListItemIcon>
        <ListItemText 
          primary="Home"
        />
      </ListItemButton>
      <ListItemButton component = "a" href="">
        <ListItemIcon>
          <StakeIcon fill='white' width='24px' height='24px'/>
        </ListItemIcon>
        <ListItemText primary="Stake" />
      </ListItemButton>
      <ListItemButton component = "a">
        <ListItemIcon>
          <DocsIcon fill='white' width='24px' height='24px'/>
        </ListItemIcon>
        <ListItemText primary="Docs"/>
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <SocialIcon fill='white' width='24px' height='24px'/>
        </ListItemIcon>
        <ListItemText primary="Social" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <SubListItemButton 
            title = "Telegram" 
            url = "https://t.me/titano_finance"
            icon = {<TelegramIcon />}
          />
          <SubListItemButton 
            title = "Twitter" 
            url = "https://twitter.com/TitanoFinance"
            icon = {<TwitterIcon />}
          />
          <SubListItemButton 
            title = "Discord" 
            url = "https://discord.gg/xxdS792B7q"
            icon = {<DiscordIcon fill='white' width='24px' height='24px'/>}
          />
          <SubListItemButton 
            title = "Medium" 
            url = "https://titano.medium.com/"
            icon = {<MediumIcon fill='white' width='24px' height='24px'/>}
          />
        </List>
      </Collapse>
      </Paper>
      </ThemeProvider>
    </List>
  );
}

function MainMenuForMobile() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const socialSubMenu = ()=> {
    if (!open)
      return(<></>);
    return(<ul>
      Social
      </ul>)
  };

  return(
      <ul className="vertical-bar clearfix mob">
          <li><a>Home</a></li>
          <li><a>Stake</a></li>
          <li><a>Docs</a></li>
          <li>
            <SocialPopupMenu />
          </li>
      </ul>
  );
}

export default ListMainMenu;
export {MainMenuForMobile};