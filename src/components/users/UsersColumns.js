import { Switch } from '@material-ui/core';
import React from 'react';
import Avatar from 'react-avatar';
import Input from "@material-ui/core/Input";

/*
In order to validate errors on the input field you can
override the editComponent of the Material Table to add a new material-ui Input fields
and use props for validation.
Information on material-ui Input element https://material-ui.com/api/input/
Information on material-table Props https://material-table.com/#/docs/all-props
You can also find an example of an overridden element bellow. Overriding the render method is not a must.
 */
const GetUsersColumns = (totalCount) => [
  {title: "Id", field: "Id",hidden:true},

  {title: "ID Cuenta", field: "AccountId"},
{title: "Nombre Usuario", field: "UserName"},
{title: "Contraseña", field: "Password"},
{title: "Email", field: "Email"},
{title: "Activo ?", field: "IsActive"},
{title: "Administrador ?", field: "IsAdmin"},
{title: "Ultim tiempo de acceso", field: "LastLoginTime",type:"date"},
{title: "Fecha de Creacion", field: "CreatedDate",type:"date"},
{title: "Creado por", field: "Creator"},
{title: "Fecha de Modificacion", field: "ModifiedDate",type:"date"},
{title: "Modificado por", field: "Modifier"},

]
export default GetUsersColumns;
