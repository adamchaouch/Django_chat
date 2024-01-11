import { Box, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import useAxiosInterceptor from "../../helpers/jwtinterceptor"
import React from "react"

type SecondaryDrawProps = {
    children: React.ReactNode
}

const SecondaryDraw =({children}:SecondaryDrawProps)=>{
const theme=useTheme()
const jwtAxios=useAxiosInterceptor();


/* jwtAxios.get("http://127.0.0.1:8000/api/server/select/?category=cat1")
.then((response)=>{
    console.log(response.data)
}).catch((error)=>{
    console.log(error)

}) */
    return(
    <Box sx={{
    minWidth:`${theme.SecondaryDraw.width}px`,
    height:`calc(100vh - ${theme.PrimaryAppBar.height}px )`,
    mt:`${theme.PrimaryAppBar.height}px`,
    borderRight:`1px solid ${theme.palette.divider}`,
    display:{xs:"none",sm:"block"},
    overflow:"auto",
    }}>
           {children}
    </Box>)
}
export default SecondaryDraw