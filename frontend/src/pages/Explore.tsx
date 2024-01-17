import {Box, CssBaseline} from "@mui/material"
import PrimaryAppBar from "./templates/PrimaryAppBar"
import PrimaryDraw from "./templates/PrimaryDraw"
import SecondaryDraw from "./templates/SecondaryDraw"
import Main from "./templates/Main"
import PopularChannels from "../components/PopularChannels"
import ExploreCategories from "../components/ExploreCategories"
import ExploreServers from "../components/ExploreServers"

const Explore = ()=>{

    return(
        <Box sx={{display:"flex"}}>
            <CssBaseline/>
            <PrimaryAppBar/>
            <PrimaryDraw>
            <PopularChannels open={false} />
            </PrimaryDraw>
            <SecondaryDraw>
                <ExploreCategories />
            </SecondaryDraw>
            <Main>
                <ExploreServers/>
            </Main>
        </Box>
    )
}
export default Explore