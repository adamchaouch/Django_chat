import { Box, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from "@mui/material"
import useCrud from "../hooks/useCrud";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MEDIA_URL } from "../config";


interface Category {
    id:number;
    name:string;
    description:string;
    icon:string;
}
const ExploreCategories =()=> {
    const theme=useTheme()
    const {fetchData, dataCRUD, error, isLoading}=useCrud<Category>([],"/category/select/");

useEffect(()=>{
    fetchData()
    console.log("categoy",dataCRUD)

},[])

return <>
<Box sx={{
    height:"50px",display:"flex",
    alignItems:"center",
    px:2,
    borderBottom:`1px solid ${theme.palette.divider}`,
    position:"sticky",top:0,backgroundColor:theme.palette.background.default
}}>
    Explore 
</Box>
<List sx={{py:0}}>
{dataCRUD.map((item)=>(
            <ListItem key={item.id} disablePadding sx={{display:"block"}} dense={true}>
                <Link to={`/explore/${item.name}`} style={{textDecoration:"None",color:'inherit'}}>
                    <ListItemButton sx={{minHeight:48}}>
                        <ListItemIcon sx={{
                            minWidth:0,justifyContent:"center"
                        }}>
                            <ListItemAvatar sx={{minWidth:"0px"}}>
                                <img alt="categorie icon" src={`${MEDIA_URL}${item.icon}`} style={{width:"25px",height:"25px",display:"block",margin :"auto"}} />
                            </ListItemAvatar>
                        </ListItemIcon>
                    <ListItemText primary={<Typography variant="body1" textAlign="start" paddingLeft={1}>
                        {item.name}

                    </Typography>}
                    
                    
                     />

                    
                    </ListItemButton>
                </Link>
            </ListItem>
        )

        )}
</List>
</>
}

export default ExploreCategories