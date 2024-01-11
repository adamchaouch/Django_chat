import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { Box, IconButton } from "@mui/material"


type Props ={
    open:boolean;
    handleDrawerOpen: ()=>void;
    handleDrawerClose: ()=>void;
}
const DrawerToggle =(props:Props)=>{


    return(
        <Box
        sx={{
            height:"50px",
            display:"flex",
            alignItems:"center",
            justifyContent:"center"
        }}>
            <IconButton onClick={props.open?props.handleDrawerClose:props.handleDrawerOpen}>
                {props.open? <ChevronLeftIcon/>:<ChevronRightIcon/>}
            </IconButton>
        </Box>
    )
}
export default DrawerToggle