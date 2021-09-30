import PageTemplate from "../templates/Template";
import DocumentTable from "./DocumentTable";
import React from "react";

const DocumentPage = (props) => {
    return(
    <PageTemplate title="Listado de Giftcard">
        <DocumentTable/>
    </PageTemplate>)
}
export default DocumentPage;
