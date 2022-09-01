import React, { useState } from 'react';
import useEagerConnect from '../../hooks/useEagerConnect';
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import logo from '../../assets/img/horde-logo-500.png';
import './sidebar.css';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaImages, FaRegImages } from 'react-icons/fa';
import { AiFillDashboard, AiOutlineDashboard } from 'react-icons/ai';
import { HiRefresh } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import useTokenBalance from '../../hooks/useTokenBalance';
import useTombFinance from '../../hooks/useTombFinance';
import { getDisplayBalance } from '../../utils/formatBalance';
import { BigNumber } from 'ethers';
import useHordePrice from '../../hooks/useHordePrice';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },

  active: {
    color: 'white !important',
    textTransform: 'capitalize',
    //   margin: theme.spacing(1, 2),
    background: '#17c139',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '16px',
    paddingTop: '10px',
  },

  drawer: {
    width: 240,
    flexShrink: 0,
    fontSize: '20px',
  },
  drawerActive: {
    width: 240,
    flexShrink: 0,
    fontSize: '20px',
    background: '#17c139',
  },

  link: {
    // fontSize: "16px",
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

  userImage: {
    position: 'fixed',
    width: '100px',
    display: 'block',
    marginLeft: '70px',
    marginTop: '10px',
  },
}));

const Sidebar = () => {
  const [stateNav, setStateNav] = useState('');
  const changeNavbar = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (stateNav === '') {
      setStateNav('true');
    } else {
      setStateNav('');
    }
  };

  const menuLinks = [
    {
      id: 1,
      name: 'Dashboard',
      path: '/dashboard',
      icon: <AiFillDashboard />,
    },
    {
      id: 2,
      name: 'Swap',
      path: '/swap',
      icon: <HiRefresh />,
    },
    {
      id: 3,
      name: 'NFT',
      path: '/nft',
      icon: <FaImages />,
    },
  ];

  const tombFinance = useTombFinance();
  const hordeBalance = useTokenBalance(tombFinance.HORDE);
  const displayBalance = getDisplayBalance(BigNumber.from(hordeBalance), 18, 3);

  const hordePrice = useHordePrice();

  const { pathname } = useLocation();

  const classes = useStyles();

  useEagerConnect();
  return (
    <>
      {stateNav === '' ? (
        <ProSidebar
          onToggle={(value: boolean) => {}}
          className="sidebar"
          width="230px"
          collapsedWidth="60px"
          breakPoint="xs"
        >
          <SidebarHeader>
            <div className="sidebar-header">
              <div className="text-center">
                <Link to="/">
                  <div className="">
                    <img src={logo} alt="User profile" className={classes.userImage} style={{ marginTop: '-65px' }} />
                  </div>
                </Link>
              </div>
              <div className=" navbar-bg-2" style={{ marginTop: '80px' }}>
                <span className="user-name text-white mb-2  ">
                  <b>{displayBalance} $HORDE</b>
                </span>
                <span className="user-email">1 $HORDE : {hordePrice.toFixed(3)} $BUSD</span>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              {menuLinks.map(
                ({ name, path, icon, id }) =>
                  id < 8 && (
                    <MenuItem
                      className={pathname === path ? classes.drawerActive : classes.drawer}
                      style={{ position: 'relative' }}
                    >
                      <Link color="textPrimary" to={path} className={pathname === path ? classes.active : classes.link}>
                        {icon}&nbsp;
                        {name}
                      </Link>
                    </MenuItem>
                  ),
              )}
            </Menu>
            <button className="extend-1" onClick={changeNavbar}>
              <FaAngleDoubleLeft />
            </button>
          </SidebarContent>
        </ProSidebar>
      ) : (
        <ProSidebar
          onToggle={(value: boolean) => {}}
          className="sidebar"
          width="60px"
          collapsedWidth="60px"
          breakPoint="xs"
        >
          <SidebarHeader>
            <img src={logo} alt="User profile" className={classes.userImage} />
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square" style={{ marginTop: '40px' }}>
              {menuLinks.map(
                ({ name, path, icon, id }) =>
                  id < 8 && (
                    <MenuItem
                      className={pathname === path ? classes.drawerActive : classes.drawer}
                      style={{ position: 'relative' }}
                    >
                      <Link color="textPrimary" to={path} className={pathname === path ? classes.active : classes.link}>
                        {icon}&nbsp;
                      </Link>
                    </MenuItem>
                  ),
              )}
            </Menu>
            <button className="extend" onClick={changeNavbar}>
              <FaAngleDoubleRight />
            </button>
          </SidebarContent>
        </ProSidebar>
      )}
    </>
  );
};

export default Sidebar;
