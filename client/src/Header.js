import React, { useEffect } from 'react'
import { Link, Outlet } from "react-router-dom";
import { useStateValue } from './stateProvider';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, createTheme, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CartDrawer from './CartDrawer';
// import ShoppingCartButton from './ShoppingCartButton'
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
export default function Header() {
    const [{pageIndex, user}, dispatch]= useStateValue();

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const theme = useTheme();

    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    
    function setPageIndex(index){
        dispatch({
            type:'SET_PAGE_INDEX',
            pageIndex: index
          })
    }
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
      };

      // const handleOpenUserMenu = (event) => {
        //   setAnchorElUser(event.currentTarget);
      // };
      const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });
    
      const handleCloseNavMenu = () => { 
        setAnchorElNav(null);
      };
    
      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };
    const handleSignOut = ()=>{
        if(user){
            localStorage.removeItem("storageUser");
            dispatch({
                type:'SET_USER',
                user:null
              })
        }        
    }
    const menuItems=[
        <Link to='/addProduct'>Add a product</Link>,
        <button className='p-3'  onClick={handleSignOut}>Sign out</button>
        ];
    return (
        <div className="relative flex flex-col ">
            <div className="z-20 flex justify-between items-center h-20 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-90  border-b-yellow-800 border-b-[1px] fixed w-full top-0 left-0 ">
                <div  className="ml-7 h-16  p-1 m-2 flex items-center gap-x-4">
                    <Link 
                    onClick={()=>{setPageIndex(1);window.scrollTo({top: 0, left: 0,behavior: "smooth"})}} 
                    to={'/'} 
                    className='text-3xl  sm:inline' style={{fontFamily:['Patrick Hand']}}>
                        Full House Deco
                    </Link>
                </div>
                {user!=='' && user?.token && (
                <>
                <Link to='/addProduct'><Button sx={{display:{xs:'none', sm:'flex'}}} variant='outlined' color='success' ><AddIcon/></Button></Link>
                
                <Box sx={{marginRight:'30px'}} >
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
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
                    onClose={handleCloseNavMenu}
                    sx={{
                    // pr:0,
                    // background:'grey',
                    // display: { xs: 'block', md: 'none' },
                    // width:'100%'
                    }}
                    
                >
                    {menuItems.map((menuItem, index) => (
                    <MenuItem 
                    sx={{ display:{sm: ( 0===index ) && 'none'}, 
                    background:menuItems.length-1===index && 'red',color:menuItems.length-1===index && 'white',
                    '&:hover': {
                        color: 'red',
                        backgroundColor: 'white',
                      }
                }}
                    key={index} 
                    onClick={handleCloseNavMenu}
                    divider={index!==menuItems.length-1 ? true:false}
                    >
                        {/* <Typography textAlign="center"> */}

                                {menuItem}

                        {/* </Typography> */}
                    </MenuItem>
                    

                    ))}
                </Menu>
                </Box>
                    {/* <Link to={!user && '/login'}>
                        <Button color='error' variant='contained' onClick={handleSignOut} className="header__option">
                            <span className="header__optionLineTwo">Sign out</span>
                        </Button>
                    </Link> */}
                </>)}
            {user == null && <CartDrawer/> }

            </div>
            <div  className="mt-20">
                <Outlet />
            </div>
        </div>
    )
}
