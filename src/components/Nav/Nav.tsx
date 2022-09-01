import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  IconButton,
  ListItem,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { AiFillGithub, AiOutlineTwitter } from 'react-icons/ai';
import { FaDiscord, FaTelegramPlane } from 'react-icons/fa';
import { HiBookOpen } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/img/horde-logo-500.png';
import rugdoc from '../../assets/img/horde.png';
import threeDots from '../../assets/img/threeDots.svg';
import useHordePrice from '../../hooks/useHordePrice';
import Spacer from '../Spacer';
import AccountButton from './AccountButton';

const menuLinks = [
  {
    id: 1,
    name: 'Dashboard',
    path: '/',
  },
  {
    id: 2,
    name: 'Swap',
    path: '/swap',
  },
  {
    id: 3,
    name: 'NFT',
    path: '/nft',
  },
];
const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    width: '100%',
    backgroundColor: '#16191d73',
    [theme.breakpoints.up('md')]: {
      marginBottom: '60px',
    },
  },
  active: {
    color: 'white',
    textTransform: 'capitalize',
    margin: theme.spacing(1, 2),
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  activeSpider: {
    position: 'absolute',
    top: '50px',
    left: 0,
    right: 0,
    margin: 'auto',
  },
  tokenPrice: {
    paddingTop: '16px',
    paddingLeft: '20px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'white',
  },
  activeSmallSpider: {
    position: 'absolute',
    top: '0',
    right: '10px',
    bottom: 0,
    margin: 'auto',
    // width: "100%",
  },
  box: {
    flexGrow: 1,
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: '80%',
    backgroundSize: '50%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: ' left bottom',
    backgroundColor: '#1b232d',
  },
  hide: {
    display: 'none',
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    fontFamily: '"Amarante", cursive',
    fontSize: '30px',
    marginTop: '10px',
  },
  link: {
    color: 'rgb(140, 159, 162)',
    textTransform: 'capitalize',
    fontSize: '16px',
    fontWeight: 500,
    margin: '0 20px',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
      color: '#fff',
    },
    '&:focus': {
      color: '#fff',
    },
  },
  sociallink: {
    color: 'rgb(140, 159, 162)',
    textTransform: 'capitalize',
    fontSize: '16px',
    fontWeight: 500,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
      color: '#fff',
    },
    '&:focus': {
      color: '#fff',
    },
  },
  mobileLink: {
    color: 'rgb(140, 159, 162)',
    textTransform: 'capitalize',
    fontSize: '16px',
    fontWeight: 500,
    textDecoration: 'none',
    padding: '6px',
    '&:hover': {
      textDecoration: 'none',
      color: '#fff',
    },
    '&:focus': {
      color: '#fff',
    },
  },
  brandLink: {
    textDecoration: 'none',
    margin: '0 20px 0 0',
    color: '#e0e3bd',

    '&:hover': {
      textDecoration: 'none',
    },
  },
  resLogo: {
    padding: '20px',
    display: 'grid',
    placeItems: 'center',
    textDecoration: 'none',
    color: '#e0e3bd',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  blackBg: {
    borderColor: '#4a4a4a',
    borderRadius: '4px!important',
    backgroundColor: '#16191d',
    padding: '6px 10px',
    color: 'white!important',
    height: '35px',
    marginRight: '10px',
    fontFamily: "'Chillax', sans-serif !important",
    fontSize: '14px',
  },
  blackBgNav: {
    backgroundColor: 'rgba(255, 255, 255, 0.09);',
    border: 'none',
    borderRadius: '10px!important',
    padding: '6px 10px ',
    margin: '10px 20px',
    color: 'white!important',
    height: '46px',
    fontFamily: "'Chillax', sans-serif !important",
    fontSize: '16px',
    width: '100%',
    justifyContent: 'space-between',
  },
  img: {
    width: '24px',
    height: '24px',
  },
  dotmenuitem: {
    marginRight: '14px',
    fontSize: '20px',
    color: '#FFF',
    marginBottom: '-4px',
    '&:hover': {
      background: 'rgb(49 34 86 / 0%) !important',
    },
  },
}));

const ThreeDot = styled.div`
  width: 46px;
  position: relative;
  height: 46px;
  cursor: pointer;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
  z-index: 2;
  :hover {
    cursor: pointer;
  }
  :hover button {
    background: #606c7a !important;
  }
  @media screen and (max-width: 900px) {
    display: none !important;
  }
`;
const ResItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 0;
  position: relative;
  justify-content: space-between;
  background: rgb(49 34 86 / 0%);
  @media screen and (max-width: 900px) {
    display: block;
  }
`;

const ResItemLeft = styled.div`
  color: #8c9fa2;
  font-weight: 600;
  font-size: 16px;
  margin-left: 20px;
`;
const ResItemRight = styled.div``;
interface props {
  height: number;
}

const ThreeDotMenu = styled.div<props>`
  width: 200px;
  overflow: hidden;
  height: ${(props) => props.height + 'px'};
  transition: all 0.2s linear 0s;
  box-shadow: rgb(0 0 0 / 19%) 0px 5px 25px 0px;
  background: rgb(49 34 86 / 0%);
  background: #1b232d;
  border-radius: 10px;
  padding: ${(props) => (props.height !== 0 ? '5px 0 0 0' : '0')};
  position: absolute;
  top: 60px;
  right: 0;
  :hover {
    color: #fff !important;
  }
  @media screen and (max-width: 900px) {
    width: 100%;
    z-index: 2;
    background: #121820 !important;
    position: initial;
    margin-top: 12px;
    border-radius: 0;
  }
`;

const DotMenuItem = styled.span`
  color: rgb(182, 196, 198);
  font-size: 16px;
  margin-left: 19px;
  padding: 10px 0;
  display: block;
`;

const Nav = () => {
  const matches = useMediaQuery('(min-width:900px)');
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { pathname } = useLocation();
  const [dotmenuHeight, setDotheight] = useState(0);
  const hordePrice = useHordePrice();
  const ChangeDotHeight = () => {
    setDotheight(dotmenuHeight === 0 ? 209 : 0);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const useOutsideAlerter = (ref: any) => {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          if (dotmenuHeight === 209) setDotheight(0);
        }
      }
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <AppBar position="static" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        {matches ? (
          <>
            <Typography noWrap className={classes.toolbarTitle}>
              <Link to="/" color="inherit" className={classes.brandLink}>
                <img src={logo} alt="" width="60px" />
              </Link>
            </Typography>
            <Box className={classes.box}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{ display: 'flex' }}>
                  {menuLinks.map(
                    ({ name, path, id }) =>
                      id < 8 && (
                        <div key={name} style={{ position: 'relative' }}>
                          <Link
                            color="textPrimary"
                            to={path}
                            className={pathname === path ? classes.active : classes.link}
                          >
                            {name}
                          </Link>
                        </div>
                      ),
                  )}
                </div>
                <Grid container className="price-buttons">
                  <Button className={classes.blackBg} disabled>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img src={rugdoc} width="30px" alt="" />
                      &nbsp;&nbsp; <span> ${hordePrice.toFixed(3)}</span>
                    </div>
                  </Button>
                </Grid>
              </div>
            </Box>
            <AccountButton text="Connect Wallet" />
            <ThreeDot ref={wrapperRef}>
              <button
                style={{
                  marginLeft: '10px',
                  padding: '6px 12px',
                }}
                className={classes.blackBg}
                onClick={() => ChangeDotHeight()}
              >
                <img alt="" src={threeDots} style={{ marginBottom: '2px' }} />
              </button>
              <ThreeDotMenu height={dotmenuHeight}>
                <a href="https://docs" rel="noopener noreferrer" target="_blank" className={classes.sociallink}>
                  <DotMenuItem>
                    <HiBookOpen className={classes.dotmenuitem} />
                    Documentations
                  </DotMenuItem>
                </a>
                <a href="https://github.com/" rel="noopener noreferrer" target="_blank" className={classes.sociallink}>
                  <DotMenuItem>
                    <AiFillGithub className={classes.dotmenuitem} />
                    Github
                  </DotMenuItem>
                </a>
                <a href="https://twitter.com/" rel="noopener noreferrer" target="_blank" className={classes.sociallink}>
                  <DotMenuItem>
                    <AiOutlineTwitter className={classes.dotmenuitem} />
                    Twitter
                  </DotMenuItem>
                </a>
                <a href="https://t.me/" rel="noopener noreferrer" target="_blank" className={classes.sociallink}>
                  <DotMenuItem>
                    <FaTelegramPlane className={classes.dotmenuitem} />
                    Telegram
                  </DotMenuItem>
                </a>
                <a href="https://discord.com/" rel="noopener noreferrer" target="_blank" className={classes.sociallink}>
                  <DotMenuItem>
                    <FaDiscord className={classes.dotmenuitem} />
                    Discord
                  </DotMenuItem>
                </a>
              </ThreeDotMenu>
            </ThreeDot>
          </>
        ) : (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap style={{ marginTop: '9px' }}>
              <Link to="/" color="inherit" className={classes.brandLink}>
                <img src={logo} alt="" width="60px" />
              </Link>
            </Typography>

            <Drawer
              className={classes.drawer}
              onEscapeKeyDown={handleDrawerClose}
              onBackdropClick={handleDrawerClose}
              variant="temporary"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <Link to="/" color="inherit" className={classes.resLogo}>
                <img src={logo} alt="" width="140px" />
              </Link>
              <ListItem
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <AccountButton text="Connect wallet" />
              </ListItem>
              <Spacer />

              {menuLinks.map(({ path, name }) => (
                <div key={name} style={{ padding: '10px 0px', position: 'relative' }}>
                  <Link
                    color="textPrimary"
                    to={path}
                    style={{ fontSize: '16px' }}
                    className={pathname === path ? classes.active : classes.link}
                  >
                    {name}
                  </Link>
                </div>
              ))}
              <ResItem>
                <ResItemLeft onClick={() => ChangeDotHeight()}>More</ResItemLeft>
                <ResItemRight />
                <ThreeDotMenu height={dotmenuHeight}>
                  <a href="https://docs" rel="noopener noreferrer" target="_blank" className={classes.sociallink}>
                    <DotMenuItem>
                      <HiBookOpen className={classes.dotmenuitem} />
                      Documentations
                    </DotMenuItem>
                  </a>
                  <a href="https://github.com" rel="noopener noreferrer" target="_blank" className={classes.sociallink}>
                    <DotMenuItem>
                      <AiFillGithub className={classes.dotmenuitem} />
                      Github
                    </DotMenuItem>
                  </a>
                  <a
                    href="https://twitter.com/"
                    rel="noopener noreferrer"
                    target="_blank"
                    className={classes.sociallink}
                  >
                    <DotMenuItem>
                      <AiOutlineTwitter className={classes.dotmenuitem} />
                      Twitter
                    </DotMenuItem>
                  </a>
                  <a href="https://t.me/" rel="noopener noreferrer" target="_blank" className={classes.sociallink}>
                    <DotMenuItem>
                      <FaTelegramPlane className={classes.dotmenuitem} />
                      Telegram
                    </DotMenuItem>
                  </a>
                  <a
                    href="https://discord.com/"
                    rel="noopener noreferrer"
                    target="_blank"
                    className={classes.sociallink}
                  >
                    <DotMenuItem>
                      <FaDiscord className={classes.dotmenuitem} />
                      Discord
                    </DotMenuItem>
                  </a>
                </ThreeDotMenu>
              </ResItem>

              <Divider />
              <div className={classes.tokenPrice}>TOKEN PRICE</div>
              <ListItem
                style={{
                  display: 'flex',
                  alignItems: 'left',
                  justifyContent: 'center',
                  padding: '0px 0px',
                }}
              >
                <Button className={classes.blackBgNav} disabled>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={rugdoc} width="36px" />
                    &nbsp;&nbsp; <span> ${103}</span>
                  </div>
                </Button>
              </ListItem>
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Nav;
