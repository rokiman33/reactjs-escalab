import PageTemplate from "../templates/Template";
import DocumentlogTable from "./DocumentlogTable";
import React from "react";

const DocumentlogPage = (props) => {
    return(
    <PageTemplate title="Documentlog List">
        <DocumentlogTable/>
    </PageTemplate>)
}
export default DocumentlogPage;
