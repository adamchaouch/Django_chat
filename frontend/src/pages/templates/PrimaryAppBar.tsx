import { AppBar, Box, Drawer, IconButton, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from "react";

const PrimaryAppBar =()=>{
    const [sideMenu,setSideMenu]=useState(false)
    const theme =useTheme();
    const isSmallScreen= useMediaQuery(theme.breakpoints.up("sm"))
    useEffect(()=>{
        if (isSmallScreen && sideMenu){
            setSideMenu(false)
        }
    },[isSmallScreen])
    const toggleDrawer =
    (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setSideMenu(!open);
    };
    
    return(
        <AppBar sx={{zIndex :(theme)=>theme.zIndex.drawer+1,backgroundColor:theme.palette.background.default,borderBottom:`1px solid ${theme.palette.divider}`}} >
            <Toolbar variant="dense" sx={{height:theme.PrimaryAppBar.height,minHeight:theme.PrimaryAppBar.height}}>
                <Box sx={{display:{xs:"block",sm:"none"}}}>
                <IconButton color="inherit" aria-data="open drawer" edge="start" sx={{mr:2}} onClick={toggleDrawer(sideMenu)}>
                <MenuIcon/>
                </IconButton>
                </Box>
                <Drawer anchor="left" open={sideMenu} onClose={toggleDrawer(sideMenu)}>
                    {[...Array(100)].map((_, i) => (
                        <Typography key={i} paragraph>{i + 1}</Typography>
                    ))}
                </Drawer>
                <Link  underline="none" color="inherit">
                    <Typography variant="h6" noWrap component="div" sx={{display:{fontWeight:700,letterSpacing:"-0.5px"}}}>
                        CHAT DJ
                    </Typography>
                    </Link> 
            </Toolbar>
        </AppBar>
    )

}
export default PrimaryAppBar;