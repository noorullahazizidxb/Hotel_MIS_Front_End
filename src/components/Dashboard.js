// import * as React from 'react';
// import { styled, useTheme } from '@mui/material/styles';
// import {withStyles,makeStyles} from '@mui/styles';
// import Box from '@mui/material/Box';
// import MuiDrawer from '@mui/material/Drawer';
// import MuiAppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import CssBaseline from '@mui/material/CssBaseline';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import ListItem from '@mui/material/ListItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
// import {withRouter} from 'react-router-dom';
// import Collapse from '@material-ui/core/Collapse';
// import ExpandLess from '@mui/icons-material/ExpandLess';
// import ExpandMore from '@mui/icons-material/ExpandMore';
// import StarBorder from '@mui/icons-material/StarBorder';

// const drawerWidth = 240;





// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: 'hidden',
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: 'hidden',
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up('sm')]: {
//     width: `calc(${theme.spacing(9)} + 1px)`,
//   },
// });

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'flex-end',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: 'nowrap',
//     boxSizing: 'border-box',
//     ...(open && {
//       ...openedMixin(theme),
//       '& .MuiDrawer-paper': openedMixin(theme),
//     }),
//     ...(!open && {
//       ...closedMixin(theme),
//       '& .MuiDrawer-paper': closedMixin(theme),
//     }),
//   }),
// );


// const Dashboard=props=> {

//   const theme = useTheme();


//   const {history,pageContent}=props;
//   const [open, setOpen] = React.useState(true);
//   const [openImport, setOpenImport] = React.useState(true);

//   const importitemList=[
//     {
//       text:'Home',
//       icon:<InboxIcon style={{color:'white'}}/>,
//       onClick:()=>history.push('/Home'),
//       nested:false,
//     },
//     {
//       text:'Import Stocks',
//       icon:<MailIcon style={{color:'white'}}/>,
//       onClick:()=>history.push('/importSocks'),


//     },

//   ];
//   const sales=[
//     {
//       text:'Cash',
//       icon:<MailIcon style={{color:'white'}}/>,
//       onClick:()=>history.push('/Sales')

//     },
//     {
//       text:'Loans',
//       icon:<MailIcon style={{color:'white'}}/>,
//       onClick:()=>history.push('/Loans')

//     },
//   ];
//   const settingItemList=[

//     {
//       text:'Settings',
//       icon:<InboxIcon style={{color:'white'}}/>,
//       onClick:()=>history.push('/Settings')


//     }
//   ]
//   const saleshandleClick=()=>setOpenImport(!openImport);

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar position="fixed" open={open} style={{ background: '#2E3B55' }}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={{
//               marginRight: '36px',
//               ...(open && { display: 'none' }),
//             }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div">
//             Rizq Halal Ltd
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer variant="permanent"  open={open}>
//         <DrawerHeader>
//           <IconButton onClick={handleDrawerClose}>
//             {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
//           </IconButton>
//         </DrawerHeader>
//         <Divider />
//         <List>
//           {
//             importitemList.map((item, index) => {
//             const {text,icon,onClick}=item;

//             return (
//               <ListItem button key={text} onClick={onClick}>
//               {icon && <ListItemIcon>{icon}</ListItemIcon>}
//               <ListItemText primary={text} />

//             </ListItem>


//             );
//           })

//           }


//         </List>
//         <Divider />
//         <List>
//         {
//           settingItemList.map((item, index) => {
//             const {text,icon,onClick}=item;

//             return (
//               <ListItem button key={text} onClick={onClick}>
//               {icon && <ListItemIcon>{icon}</ListItemIcon>}
//               <ListItemText primary={text} />
//             </ListItem>
//             )
//           })
//           }
//         </List>
//       </Drawer>
//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <DrawerHeader />
//         {pageContent}

//       </Box>
//     </Box>
//   );
// }
// export default withRouter(Dashboard);
import './../App.scoped.css';
import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { withRouter } from 'react-router-dom';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import StarBorder from '@material-ui/icons/StarBorder';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import MonetizationOnRoundedIcon from '@material-ui/icons/MonetizationOnRounded';
import TransferWithinAStationRoundedIcon from '@material-ui/icons/TransferWithinAStationRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import AddShoppingCartRoundedIcon from '@material-ui/icons/AddShoppingCartRounded';
import AuthApi from "../AuthApi";
import { withCookies, useCookies } from "react-cookie";
import Button from '@material-ui/core/Button';
import MeetingRoomRoundedIcon from '@material-ui/icons/MeetingRoomRounded';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from "@mui/material/MenuItem";
import MoreIcon from '@mui/icons-material/MoreVert';
import ShopRoundedIcon from '@material-ui/icons/ShopRounded';
import AccountBalanceRoundedIcon from '@material-ui/icons/AccountBalanceRounded';

import AccountCircle from '@mui/icons-material/AccountCircle';
import { AccountBoxRounded, BusinessRounded, DashboardRounded, DnsRounded, GroupAddRounded, ListAltRounded, PostAddRounded } from '@material-ui/icons';
import '../App.scoped.css';
import '../index.css';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  nested: {
    paddingLeft: theme.spacing.unit * 10,
  },
  button: {
    margin: theme.spacing(1),
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    background: 'var(--drawer-color)',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.complex,

    }),
  },
  drawerClose: {
    background: 'var(--drawer-color)',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,

    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: 'var(--background)'
  },
}));

const Dashboard = props => {
  const Auth = React.useContext(AuthApi);
  const [cookies, setCookie, removeCookie] = useCookies(['Token']);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [rowData, setRowData] = React.useState(null);
  const [EM_rowData, setEM_rowData] = React.useState(null);
  const [add_contract_rowData, set_Add_Contract_RowData] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {

    history.push('/Users');
  };
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);

  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleLogOut = () => {
    Auth.SetAuth(false);
    removeCookie('Refresh');
    removeCookie('Token');
    removeCookie('User');
    handleMenuClose();
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}><MeetingRoomRoundedIcon />Profile</MenuItem>
      <MenuItem onClick={handleLogOut}><MeetingRoomRoundedIcon />Sign Out</MenuItem>
      <MenuItem onClick={props.switchTheme}><MeetingRoomRoundedIcon />Change Theme</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >


      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>

      <MenuItem onClick={handleLogOut}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <MeetingRoomRoundedIcon />
        </IconButton>
        <p>Sign Out</p>
      </MenuItem>
      <MenuItem onClick={props.switchTheme}>
        <IconButton
          size="large"
          aria-label="change the theme"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <MeetingRoomRoundedIcon />
        </IconButton>
        <p>change theme</p>
      </MenuItem>
    </Menu>
  );

  const itemList = [
    {
      text: 'خانه',
      icon: <DashboardRounded style={{ color: 'var(--text-primary)' }} />,
      onClick: () => { history.push('/Home') },

    },

  ];
  const Hr_Items = [

    {
      text: 'اضافه نمودن کارمند',
      icon: <GroupAddRounded style={{ color: 'var(--text-primary)' }} />,
      onClick: () => {
        history.push({
          pathname: '/Add_Employee',
          state: { rowData, EM_rowData, add_contract_rowData }
        })
      },

    },
    {
      text: 'لست کارمندان',
      icon: <ListAltRounded style={{ color: 'var(--text-primary)' }} />,
      onClick: () => { history.push('/Employee_List'); },

    },

  ];
  const Finance_Items = [

    {
      text: 'تعریف مواد',
      icon: <PostAddRounded style={{ color: 'var(--text-primary)' }} />,
      onClick: () => {
        history.push({
          pathname: '/Stocks',
          state: { rowData, EM_rowData, add_contract_rowData }
        })
      },

    },
    {
      text: 'خریداری مواد خام',
      icon: <AddShoppingCartRoundedIcon style={{ color: 'var(--text-primary)' }} />,
      onClick: () => { history.push('/Employee_List'); },

    },
    {
      text: 'اجرای معاشات',
      icon: <MonetizationOnRoundedIcon style={{ color: 'var(--text-primary)' }} />,
      onClick: () => { history.push('/Employee_List'); },

    },
    {
      text: 'فروشات',
      icon: <TransferWithinAStationRoundedIcon style={{ color: 'var(--text-primary)' }} />,
      onClick: () => { history.push('/Employee_List'); },
    },
  ];

  const sales = [
    {
      text: 'Cash',
      icon: <MonetizationOnRoundedIcon style={{ color: 'var(--text-primary)' }} />,
      onClick: () => { history.push('/Sales') },

    },
    {
      text: 'Loans',
      icon: <TransferWithinAStationRoundedIcon style={{ color: 'var(--text-primary)' }} />,
      onClick: () => { history.push('/Loans') },

    },
    {
      text: 'Customer List',
      icon: <DnsRounded style={{ color: 'var(--text-primary)' }} />,
      onClick: () => { history.push('/Customer_List') }

    },
  ];
  const settingItemList = [

    {
      text: 'Products',
      icon: <PostAddRounded style={{ color: 'var(--text-primary)' }} />,
      onClick: () => { history.push('/Products') },


    },
    {
      text: 'Customers',
      icon: <GroupAddRounded style={{ color: 'var(--text-primary)' }} />,
      onClick: () => { history.push('/Customers') }


    },
    {
      text: 'Companies',
      icon: <BusinessRounded style={{ color: 'var(--text-primary)' }} />,
      onClick: () => { history.push('/Companies') }


    },
    {
      text: 'SalesMan',
      icon: <AccountBoxRounded style={{ color: 'var(--text-primary)' }} />,
      onClick: () => { history.push('/SalesMan') },


    },
    {
      text: 'Account Settings',
      icon: <AccountBalanceRoundedIcon style={{ color: 'var(--text-primary)' }} />,
      onClick: () => { history.push('/Accounts') },


    },
    {
      text: 'Expanse',
      icon: <AccountBalanceRoundedIcon style={{ color: 'var(--text-primary)' }} />,
      onClick: () => { history.push('/Expanse') },


    },
  ]

  const { history, pageContent } = props;

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [opensales, setOpenSales] = React.useState(false);
  const [openfinance, setOpenFinance] = React.useState(false);
  const [open_hr, setOpen_Hr] = React.useState(false);
  const [opensettings, setOpensettings] = React.useState(false);

  const saleshandleClick = () => setOpenSales(!opensales);
  const settingshandleClick = () => setOpensettings(!opensettings);
  const hrhandleClick = () => setOpen_Hr(!open_hr);
  const financehandleClick = () => setOpenFinance(!openfinance);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        style={{ background: 'var(--app-bar)' }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon style={{ color: 'var(--text-primary)' }} />
          </IconButton>
          <Typography style={{ color: 'var(--text-primary)' }} variant="h6" className='font-face-Genos' noWrap>
            Shaista Khibar Money Exchange Company



          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
            >
              <AccountCircle style={{ color: 'var(--text-primary)' }} />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon style={{ color: 'var(--text-primary)' }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon style={{ color: 'white' }} /> : <ChevronLeftIcon style={{ color: 'white' }} />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {
            itemList.map((item, index) => {
              const { text, icon, onClick } = item;
              return (
                <ListItem button key={text} onClick={onClick}>
                  {icon && <ListItemIcon>{icon}</ListItemIcon>}
                  <ListItemText style={{ color: 'var(--text-primary)' }} primary={text} />

                </ListItem>


              );
            })

          }
          <hr style={{ color: 'var(--text-primary)' }} />
          <ListItem button onClick={hrhandleClick}>
            <ListItemIcon>
              <AccountBoxRounded style={{ color: 'var(--text-primary)' }} />


            </ListItemIcon>
            <ListItemText style={{ color: 'var(--text-primary)' }} primary="منابع بشری" />
            {open_hr ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open_hr} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {
                Hr_Items.map((item, index) => {
                  const { text, icon, onClick } = item;

                  return (
                    <ListItem button key={text} onClick={onClick}>
                      {icon && <ListItemIcon>{icon}</ListItemIcon>}
                      <ListItemText style={{ color: 'var(--text-primary)' }} primary={text} />
                    </ListItem>
                  )
                })
              }

            </List>
          </Collapse>


        </List>
        <Divider />

        <List>
          <hr style={{ color: 'var(--text-primary)' }} />
          <ListItem button onClick={financehandleClick}>
            <ListItemIcon>
              <AccountBalanceRoundedIcon style={{ color: 'var(--text-primary)' }} />


            </ListItemIcon>
            <ListItemText style={{ color: 'var(--text-primary)' }} primary="بخش مالی" />
            {openfinance ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openfinance} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {
                Finance_Items.map((item, index) => {
                  const { text, icon, onClick } = item;

                  return (
                    <ListItem button key={text} onClick={onClick}>
                      {icon && <ListItemIcon>{icon}</ListItemIcon>}
                      <ListItemText style={{ color: 'var(--text-primary)' }} primary={text} />
                    </ListItem>
                  )
                })
              }

            </List>
          </Collapse>

          <hr style={{ color: 'var(--text-primary)' }} />
        </List>
        <Divider />


        <List>

          <ListItem button onClick={saleshandleClick}>
            <ListItemIcon>
              <ShoppingCartOutlinedIcon style={{ color: 'var(--text-primary)' }} />
            </ListItemIcon>
            <ListItemText style={{ color: 'var(--text-primary)' }} primary="حساب ها" />
            {opensales ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={opensales} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {
                sales.map((item, index) => {
                  const { text, icon, onClick } = item;

                  return (
                    <ListItem button key={text} onClick={onClick}>
                      {icon && <ListItemIcon>{icon}</ListItemIcon>}
                      <ListItemText style={{ color: 'var(--text-primary)' }} primary={text} />
                    </ListItem>
                  )
                })
              }

            </List>
          </Collapse>
          <hr style={{ color: 'var(--text-primary)' }} />

          <ListItem button onClick={settingshandleClick}>
            <ListItemIcon>
              <SettingsRoundedIcon style={{ color: 'var(--text-primary)' }} />
            </ListItemIcon>
            <ListItemText style={{ color: 'var(--text-primary)' }} primary="مشتریان" />
            {opensettings ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={opensettings} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {
                settingItemList.map((item, index) => {
                  const { text, icon, onClick } = item;

                  return (
                    <ListItem button key={text} onClick={onClick}>
                      {icon && <ListItemIcon>{icon}</ListItemIcon>}
                      <ListItemText style={{ color: 'var(--text-primary)' }} primary={text} />
                    </ListItem>
                  )
                })
              }

            </List>
          </Collapse>



        </List>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        {pageContent}
      </main>
    </div>

  );
}
export default withRouter(Dashboard);