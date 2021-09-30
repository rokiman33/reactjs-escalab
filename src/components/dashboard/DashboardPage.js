import PageTemplate from "../templates/Template";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DashCard from "./DashboardCard"

const DashboardPage = () => {

    return(
    <PageTemplate title="Dashboard">
    <Grid container direction="row"  justify="center" alignItems="center">
    <DashCard pagename='customer'/>
<DashCard pagename='customerlog'/>
<DashCard pagename='document'/>
<DashCard pagename='documentlog'/>
<DashCard pagename='users'/>

    
    
    
    </Grid>
    </PageTemplate>)
}
export default DashboardPage;

