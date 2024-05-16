'use client'
import * as React from 'react';
import { styled, alpha, useTheme, ThemeProvider } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreIcon from '@mui/icons-material/MoreVert';
import { AppBar, Avatar, Badge, BadgeProps, Box, Divider, IconButton, InputBase, Menu, MenuItem, Stack, Toolbar, Typography, useMediaQuery } from '@mui/material';
import Button from '@mui/material/Button';
import { usePathname, useRouter } from 'next/navigation';
import Link, { NextLinkComposed } from '../link/Link';
import { customTheme } from '@/app/theme/theme';
import productStore from '@/app/store/productStore';
import { observer } from 'mobx-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
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
    [customTheme.breakpoints.up('xs')]: {    //new
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

export default observer(function NavBar() {
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

    const pathname = usePathname()
    const isActive = (path: string) => path === pathname;

    const { data: session, status } = useSession()
    const router = useRouter();

    const handleLogin = () => {
        router.push('/login');
        //router.push('/api/auth/signin');// if you use server-side login
    };
    // variant={`${isActive(page.path) ? 'outlined' : 'text'}`}

    const handleLogout = () => {
        signOut();
    };

    const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));


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
            <MenuItem onClick={handleLogout}>Sign out</MenuItem>
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
            sx={{ maxWidth: '160px', justifyContent: 'center', display: 'flex', gap: 1 }}
        >
            {pages.map((page) => (
                <Button
                    key={page.id}
                    component={NextLinkComposed}
                    to={page.path}
                    onClick={handleMobileMenuClose}
                    color={`${isActive(page.path) ? 'primary' : 'inherit'}`}
                    variant={'text'}
                    sx={{ p: isActive(page.path) ? undefined : '6px 16px', width: '90px', mx: 1 }}
                >
                    {/* <Typography textAlign="center"> */}
                    {page.name}
                    {/* </Typography> */}
                </Button>
            ))}
            <Divider sx={{mt: 1}} />
            {status !== "authenticated" ?
                (
                    <Button
                        component={NextLinkComposed}
                        color={'warning'}
                        variant={`${isActive('/login') ? 'outlined' : 'text'}`}
                        to={'/login'}
                        sx={{ width: '90px', mx: 1, mt: 1 }}
                    // onClick={handleLogin}
                    >
                        Sign in
                    </Button>
                )
                :
                (
                    <>
                        <MenuItem disableGutters dense>
                            <IconButton size="small" aria-label="show orders" color="inherit">
                                <StyledBadge
                                    badgeContent={productStore.selectedProductsCount}
                                    color="success">
                                    <ShoppingCartIcon />
                                </StyledBadge>
                            </IconButton>
                            <p style={{ marginLeft: '10px' }}>Orders</p>
                        </MenuItem>
                        <MenuItem
                            dense
                            disableGutters
                            divider
                            onClick={handleProfileMenuOpen}>
                            <IconButton
                                size="small"
                                aria-label="account of current user"
                                aria-controls="primary-search-account-menu"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <Avatar
                                    alt="Profile"
                                    sizes='small'
                                    sx={{ width: 32, height: 32 }}
                                    src={session.user?.image || ''}
                                />
                            </IconButton>
                            <p>Profile</p>
                        </MenuItem>
                        <MenuItem
                            dense
                            disableGutters
                            color='error'
                            onClick={handleLogout}
                            sx={{ justifyContent: 'center', display: 'flex' }}
                        >
                                Sign out
                        </MenuItem>
                    </>
                )
            }
        </Menu>
    );


    const isSmallScreen = useMediaQuery(customTheme.breakpoints.down('lg'));
    const isExtraSmallScreen = useMediaQuery(customTheme.breakpoints.down('md'));
    const isUltraSmallScreen = useMediaQuery(customTheme.breakpoints.down('sm'));
    const isXUltraSmallScreen = useMediaQuery(customTheme.breakpoints.down('xs'));

    return (

        <Box sx={{ flexGrow: 1, }}>

            <AppBar color='inherit' sx={{
                // bgcolor: 'black',
                alignItems: isXUltraSmallScreen ? undefined : 'center'
            }}
                position="fixed">
                <Toolbar sx={{
                    // padding: '0px 40px',
                    width: isXUltraSmallScreen ? undefined : isUltraSmallScreen ? '49ch' : isExtraSmallScreen ? '56ch' : isSmallScreen ? '89ch' : '120ch',
                }}>
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
                            // sx={{ display: isUltraSmallScreen ? 'none':  'block'  }}
                            sx={{ display: 'block', color: 'cyan' }}


                        >
                            Dream Store
                        </Typography>
                    </Link>
                    {/* <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search> */}
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: isExtraSmallScreen ? 'none' : 'flex', gap: 1 }}>
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
                                color={`${isActive(page.path) ? 'primary' : 'inherit'}`}
                                variant={`${isActive(page.path) ? 'outlined' : 'text'}`}
                                // sx={{ p: activePage === page.path ? undefined : '6px 16px'}}
                                sx={{ p: isActive(page.path) ? undefined : '6px 16px' }}
                            >
                                <Typography textAlign="center">
                                    {page.name}
                                </Typography>
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ display: isExtraSmallScreen ? 'none' : 'flex', ml: isExtraSmallScreen ? 'none' : 1, gap: 1 }}>
                        {status !== "authenticated" ?
                            (
                                <Button
                                    component={NextLinkComposed}
                                    color={'warning'}
                                    variant={`${isActive('/login') ? 'outlined' : 'text'}`}
                                    to={'/login'}
                                // onClick={handleLogin}
                                >
                                    Sign in
                                </Button>
                            )
                            :
                            (
                                <>
                                    <IconButton
                                        component={Link}
                                        href={'/orders'}
                                        // size="small" 
                                        aria-label="show 4 new mails"
                                        color="inherit"
                                        activeClassName="false"
                                    >
                                        <StyledBadge
                                            badgeContent={productStore.selectedProductsCount}
                                            color="success">
                                            <ShoppingCartIcon />
                                        </StyledBadge>
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        onClick={handleProfileMenuOpen}
                                        color="inherit"
                                    >
                                        <Avatar alt="Profile" src={session.user?.image || ''} sx={{ width: 32, height: 32 }} />
                                    </IconButton>
                                </>
                            )
                        }
                    </Box>
                    <Box sx={{ display: isExtraSmallScreen ? 'flex' : 'none' }}>
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