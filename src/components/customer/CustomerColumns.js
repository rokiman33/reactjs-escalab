import { Switch } from '@material-ui/core';
import React from 'react';
import Avatar from 'react-avatar';
import Input from "@material-ui/core/Input";

const GetCustomerColumns = (totalCount) => [
  {title: "ID Unico", field: "CustomerId",hidden:true},

  {title: "Nombre de Cliente", field: "CustName"},
{title: "RUT", field: "CustIdentity"},
{title: "Certificado ID", field: "CustCert"},
{title: "Tipo Docto.", field: "CustDocType"},
{title: "Fecha Final", field: "CustFinalDate",type:"date"},
{title: "Fecha Activacion", field: "CustActivationDate",type:"date"},
{title: "Monto Vendido", field: "CustSale"},
{title: "Monto Pagado", field: "CustPay"},
{title: "Monto Recarga", field: "CustReLoad"},
{title: "Estado", field: "CustStatus"},
{title: "Info Adic 1", field: "CustInfoAdic1"},
{title: "Info Adic 2", field: "CustInfoAdic2"},
{title: "Info Adic 3", field: "CustInfoAdic3"},
{title: "Info Adic 4", field: "CustInfoAdic4"},
{title: "Fecha Adic 1", field: "CustDateAdic1",type:"date"},
{title: "Fecha Adic 2", field: "CustDateAdic2",type:"date"},
{title: "Valor Adic 1", field: "CustValueAdic1"},
{title: "Valor Adic 2", field: "CustValueAdic2"},
{title: "Valor Adic 3", field: "CustValueAdic3"},

]
export default GetCustomerColumns;
