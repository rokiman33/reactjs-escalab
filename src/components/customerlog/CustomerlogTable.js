import MaterialTable from 'material-table';
import React, {useEffect, useState} from 'react';
import tableIcons from '../templates/TableIcons';
import getColumns from './CustomerlogColumns';
import Edit from "@material-ui/icons/Edit";
import {withRouter} from "react-router";
import {AddBox} from "@material-ui/icons";
import {deleteCustomerlog, getCustomerlog} from "../../repo/customerlogRepo";


const CustomerlogTable = (props) => {
    const history = props.history;
    const [columns, setColumns] = useState(getColumns({}));

    //Here we call delete
    const handleRowDelete = (oldData, resolve) => {
        deleteCustomerlog(oldData.CustomerId)
            .then(res => {
                resolve()
            })
            .catch(error => {
                resolve()
            })
    }


    return (
    <div>
    <MaterialTable
        minRows={20}
        title="Informacion de Bitacora de Cliente"
        columns={columns}
        data={async(query)=>
            {
                const res = await getCustomerlog(query.page,query.pageSize,query.search);
                return ({
                    data: res.records,
                    page: query.page,
                    totalCount: parseInt(res.total_count)
                })
            }
        }
        options={{
            sorting:true,
            actionsColumnIndex: -1,
            pageSize: 20,
            toolbar: true,
            paging: true
        }}

        actions={[
            {
                icon: ()=> <Edit/>,
                tooltip: 'Edit',
                onClick: (event,rowData) =>{
                    history.push({
                        pathname:`/customerlog/update/${rowData.CustomerId}`,
                        user:rowData
                    })
                }
            },
            {
            icon: ()=><AddBox variant="contained" color="secondary"/>,
                tooltip: 'Add New',
                isFreeAction: true,
                onClick: (event, rowData) => {
                    history.push("/customerlog/add")
                }
            }
        ]}

        icons={tableIcons}
        editable={{
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              handleRowDelete(oldData, resolve)
            }),
        }}

      />
    </div>);
}
export default withRouter(CustomerlogTable);
