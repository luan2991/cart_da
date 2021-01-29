import { Badge, Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, matchPath, useLocation } from 'react-router-dom';
import logo from './../../image/logo.png';
//import ThemeContext, { themes } from '../../themeContext';
//import './Header.scss';

const useStyles = makeStyles((theme) => ({
  
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navlink: {
    textDecoration: 'none',
    color: 'white',
  },
  cart: {
    marginTop: '16px',
  },
  
}));

function Header(props) {
  const location= useLocation();
  const match=matchPath(location.pathname,{
    path:"/:id/detail"
  });
  
 
  const classes = useStyles();
  const cartList = useSelector((state) => state.cart.cartItems);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <img alt="home" src={logo} width={60} height={60} />
            </IconButton>
          </Link>
          <Typography variant="h6" className={classes.title}>
            LTGShop
          </Typography>
          
          {match===null &&<Link to="/add" className={classes.navlink}><Button color="inherit">Add</Button></Link>}
          {match!==null &&<Link to={`/${match.params.id}/edit`} className={classes.navlink} ><Button color="inherit">Edit</Button></Link>}
          <Link className={classes.navlink} to="/cart">
            <Badge badgeContent={cartList.length} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
