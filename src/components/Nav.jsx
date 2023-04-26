import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import axios from "../utils/axiosInstance"

const drawerWidth = 240;
const navItems = ['income Less than 5$', 'male','last_name start with M','email with no digits','top 10 city data'];



function Nav(props) {
  const { window,setFilter,filter } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleFilter = (item) => {
    switch(item){
      case 'income Less than 5$':
        setFilter('income');
        break;
      case 'male':
        setFilter('male');
        break;
      case 'last_name start with M':
        setFilter('quote');
        break;
      case 'email with no digits':
        setFilter('email');
        break;
      case 'top 10 city data':
        setFilter('city');
        break;
      default:
        setFilter('income');
        break;
    }
    return;
  }

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Filter
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'start' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar sx={{backgroundColor:'#454545',boxShadow:'none'}} component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: 'none', sm: 'block'}}}>
            {navItems.map((item) => (
              <Button className={item.slice().toLowerCase().includes(filter) || (item === 'last_name start with M' && filter === 'quote')?'after':''} key={item} sx={{ color: '#F1F6F9',fontWeight:'700','&:hover':{color:'gray'},marginInline:2,backgroundColor:item.slice().toLowerCase().includes(filter) || (item === 'last_name start with M' && filter === 'quote')?"#FF6000":'transparent'}} onClick={() => handleFilter(item)}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
    </div>
  );
}

Nav.propTypes = {
  window: PropTypes.func,
};

export default Nav;