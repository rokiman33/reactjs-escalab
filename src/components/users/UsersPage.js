import PageTemplate from "../templates/Template";
import UsersTable from "./UsersTable";
import React from "react";

const UsersPage = (props) => {
    return(
    <PageTemplate title="Listado de Usuarios">
        <UsersTable/>
    </PageTemplate>)
}
export default UsersPage;
