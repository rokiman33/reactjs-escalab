import PageTemplate from "../templates/Template";
import CustomerTable from "./CustomerTable";
import React from "react";

const CustomerPage = (props) => {
    return(
    <PageTemplate title="Listado de Clientes">
        <CustomerTable/>
    </PageTemplate>)
}
export default CustomerPage;
