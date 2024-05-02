'use client'
import * as React from 'react';
import { styled, alpha, useTheme, ThemeProvider } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreIcon from '@mui/icons-material/MoreVert';
import { AppBar, Badge, Box, IconButton, InputBase, Menu, MenuItem, Toolbar, Typography, useMediaQuery } from '@mui/material';
import Button from '@mui/material/Button';
import { usePathname } from 'next/navigation';
import Link, { NextLinkComposed } from '../link/Link';
import { customTheme } from '@/app/theme/theme';
import productStore from '@/app/store/productStore';
import { observer } from 'mobx-react';
// import Link from 'next/link';

const pages = [
    { id: 1, name: 'SPACE', path: '/space' },
    { id: 2, name: 'JOKES', path: '/jokes' },
    { id: 3, name: 'ORDERS', path: '/orders' }
];

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

//export default observer(function Info() {

export default observer( function NavBar() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

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
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
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
            {pages.map((page) => (
                <MenuItem key={page.id} onClick={handleMobileMenuClose}>
                    <Link key={page.id} href={page.path} onClick={handleMobileMenuClose} >

                        <Typography textAlign="center">{page.name}</Typography>

                    </Link>
                </MenuItem>
            ))}
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent=
                        {productStore.selectedProductsCount} 
                        color="error">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
                <p>Orders</p>
            </MenuItem>
            {/* <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem> */}
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
        </Menu>
    );

    const pathname = usePathname()
    const isActive = (path: string) => path === pathname;

    const isSmallScreen = useMediaQuery(customTheme.breakpoints.down('lg'));
    const isExtraSmallScreen = useMediaQuery(customTheme.breakpoints.down('md'));
    const isUltraSmallScreen = useMediaQuery(customTheme.breakpoints.down('sm'));
    const isXUltraSmallScreen = useMediaQuery(customTheme.breakpoints.down('xs'));

    return (
        
        <Box sx={{ flexGrow: 1, }}>

            <AppBar sx={{
                bgcolor: 'black',
                alignItems: isXUltraSmallScreen ? undefined : 'center'
            }}
                position="fixed">
                {/* <Box sx={{
                    width: isXUltraSmallScreen ? undefined : isUltraSmallScreen ? '49ch' : isExtraSmallScreen ? '56ch' : isSmallScreen ? '89ch' : '120ch',
                  
                }}> */}
                <Toolbar sx={{
                    // padding: '0px 40px',
                    width: isXUltraSmallScreen ? undefined : isUltraSmallScreen ? '49ch' : isExtraSmallScreen ? '56ch' : isSmallScreen ? '89ch' : '120ch',
                }}>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Link
                        // activeClassName={isActive("/") ? "active": undefined}
                        activeClassName="false"
                        underline='none'
                        href={"/"}
                    >
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        >

                            Dream Store
                        </Typography>
                    </Link>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.id}
                                component={NextLinkComposed}
                                // href={page.path}
                                to={page.path}
                                onClick={() => {
                                    handleMobileMenuClose;
                                    // pageChange(page);
                                }}
                                // variant={activePage === page.path ? 'outlined' : 'text'}
                                variant={`${isActive(page.path) ? 'outlined' : 'text'}`}
                                // sx={{ p: activePage === page.path ? undefined : '6px 16px'}}
                                sx={{ p: isActive(page.path) ? undefined : '6px 16px' }}
                            >
                                <Typography textAlign="center">
                                    {page.name}
                                </Typography>
                            </Button>
                        ))}
                        <IconButton component={Link} href={'/orders'} size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent=
                                {productStore.selectedProductsCount}
                                color="error">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                        {/* <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton> */}
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
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
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
                {/* </Box> */}
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
)