import { Avatar, Box, Card, CardContent, CardMedia, Container, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"
import useCrud from "../hooks/useCrud";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { MEDIA_URL } from "../config";



interface Server {
    id :number;
    name:string;
    description:string;
    category:string;
    icon:string;
    banner:string;
}

const ExploreServers =()=>{
    const {categoryName}= useParams();
    const  url =categoryName ? `/server/select/?category=${categoryName}`: "/server/select/";
    const {fetchData, dataCRUD, error, isLoading}=useCrud<Server>([],url);

    useEffect(()=>{
        fetchData()
    },[categoryName])
    return(
        <>
        <Container maxWidth="lg">
            <Box sx={{pt:6}}>
                <Typography
                variant="h3"
                noWrap
                component="h1"
                sx={{
                    display:{
                        sm:"block",
                        fontWeight:700,
                        letterSpacing:"-2px",
                        textTransform:"capitalize"
                    },
                    textAlign:{xs:"center",sm:"left"}
                }}
                >
                    {categoryName? categoryName :"Popular Channels"}
                </Typography>
            </Box>
            <Box>
                <Typography
                variant="h6"
                noWrap
                component="h2"
                color="textSecondary"
                sx={{
                    display:{
                        sm:"block",
                        fontWeight:500,
                        fontSize:"48px",
                        letterSpacing:"-2px"
                    },
                    textAlign:{xs:"center",sm:"left"}
                }}
                >
                    {categoryName? `Chanels talking about ${categoryName}` :" check out some of your Popular Channels"}
                </Typography>
            </Box>
            <Typography variant="h6" sx={{pt:6,pb:1,fontWeight:700,letterSpacing:"-1px"}}>
                Recomended Chanels
            </Typography>

            <Grid container spacing={{xs:0,sm:2}}>
                {dataCRUD.map((item)=>(

                    <Grid  item key={item.id} xs={12} sm={6} md={6} lg={3}>
                        <Card sx={{
                            height:"100%",
                            display:"flex",
                            flexDirection:"column",
                            boxShadow:"none",
                            backgroundImage:"none"
                        }}>
                            <Link to={`/server/${item.id}`}
                                style={{textDecoration:"none", color:"inherit"}} >
                                <CardMedia
                                component="img"
                                image={item.banner? item.banner: "https://source.unsplash.com/random/"}
                                alt="random"
                                sx={{display:{xs:"none",sm:"block"}}} />
                                     <CardContent
                                     sx={{
                                        flexGrow:1,
                                        p:0,
                                        "&:last-child":{paddingBottom:0}
                                     }} >
                                        <List>
                                            <ListItem disablePadding>
                                                <ListItemIcon
                                                 sx={{minWidth:0}} >
                                                <ListItemAvatar
                                                 sx={{minWidth:"50px"}}>
                                                    <Avatar alt="server icon" src={`${MEDIA_URL}${item.icon}`}></Avatar>
                                                 </ListItemAvatar>
                                                </ListItemIcon>
                                                
                                                <ListItemText primary={<Typography variant="body1" textAlign="start"
                                                    sx={{
                                                    textOverflow:"ellipsis",
                                                    overflow:"hidden",
                                                    fontWeight:700,
                                                    whiteSpace:"nowrap"}}>

                                                        {item.name}

                                                    </Typography>}
                                                    
                                                    secondary={<Typography variant="body2" >
                                                            {item.category}
                                                            
                                                        </Typography>}
                                                    
                                                    />
                                            </ListItem>
                                        </List>
                                     </CardContent>

                            </Link>

                        </Card>

                    </Grid>
                )
                
                )}
            </Grid>
        </Container>
        </>
    )
}

export default ExploreServers