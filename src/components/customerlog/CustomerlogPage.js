import PageTemplate from "../templates/Template";
import CustomerlogTable from "./CustomerlogTable";
import React from "react";

const CustomerlogPage = (props) => {
    return(
    <PageTemplate title="Listado de Log del Cliente">
        <CustomerlogTable/>
    </PageTemplate>)
}
export default CustomerlogPage;
