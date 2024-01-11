import { Box, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"



const Main =()=>{
    const theme =useTheme();

    return(
        <Box sx={{
        flexGrow:1,
        height:`calc(100vh - ${theme.PrimaryAppBar.height}px )`,
        mt:`${theme.PrimaryAppBar.height}px`,
        overflow:"hidden",
        }}>
            <Typography variant="h2">Main  component</Typography>
        </Box>)
}

export default Main