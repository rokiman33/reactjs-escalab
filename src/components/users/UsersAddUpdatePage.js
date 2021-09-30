import {withRouter} from "react-router";
import TextField from "@material-ui/core/TextField";
import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import {Switch} from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import PageTemplate from "../templates/Template";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import InputLabel from '@material-ui/core/InputLabel';
import history from '../../history';
import {addUsers, getUsers,getOneUsers, updateUsers} from "../../repo/usersRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const UsersAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [users,setUsers] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(users.AccountId === "" || users.AccountId === undefined)
{
   errorList = { ...errorList,AccountId: "¡Campo requerido!"}
}
if(users.UserName === "" || users.UserName === undefined)
{
   errorList = { ...errorList,UserName: "¡Campo requerido!"}
}
if(users.Password === "" || users.Password === undefined)
{
   errorList = { ...errorList,Password: "¡Campo requerido!"}
}
if(users.Email === "" || validateEmail(users.Email) === false)
{
   errorList = { ...errorList,Email: "¡Introduzca un correo electrónico válido!"}
}
if(users.IsActive === "" || users.IsActive === undefined)
{
   errorList = { ...errorList,IsActive: "¡Campo requerido!"}
}
if(users.IsAdmin === "" || users.IsAdmin === undefined)
{
   errorList = { ...errorList,IsAdmin: "¡Campo requerido!"}
}
if(users.CreatedDate === "" || users.CreatedDate === undefined)
{
   errorList = { ...errorList,CreatedDate: "¡Campo requerido!"}
}
if(users.Creator === "" || users.Creator === undefined)
{
   errorList = { ...errorList,Creator: "¡Campo requerido!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOneUsers(props.match.params.id).then((res) => {
                setUsers(res.data.document)
            })
        }else{
            setUsers({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (users.Id) {
               var updateResponse =  await updateUsers(users.Id,users);
               if(updateResponse && updateResponse.data){
                   if(updateResponse.data.code===1){
                    setAlertstate({ open: true, vertical: 'bottom', horizontal: 'center', message:"Record Updated Successfully.",severity:"success"});
                     }else{
                    setAlertstate({ open: true, vertical: 'bottom', horizontal: 'center', message:"Updated failed. Please try again.", severity:"error"});
                }
               }else{
                setAlertstate({ open: true, vertical: 'bottom', horizontal: 'center', message:"Updated failed. Please try again.", severity:"error"});
            }
                //props.history.push("/");
            } else {
                var addResponse = await addUsers(users)
                if(addResponse && addResponse.data){
                    if(addResponse.data.code===1){
                        setAlertstate({ open: true, vertical: 'bottom', horizontal: 'center', message:"Record Added Successfully.",severity:"success"});
                          }else{
                        setAlertstate({ open: true, vertical: 'bottom', horizontal: 'center', message:"Add Record Failed. Please try again.",severity:"error"});
                    }
                }else{
                    setAlertstate({ open: true, vertical: 'bottom', horizontal: 'center', message:"Add Record Failed. Please try again.",severity:"error"});
                    
                }
                //props.history.push("/");
            }
        }else{
            setAlertstate({ open: true, vertical: 'bottom', horizontal: 'center', message:"Invalid Data. Please try again.",severity:"error"});
                   
        } 
    }catch (e) {
        setAlertstate({ open: true, vertical: 'bottom', horizontal: 'center', message:"Invalid Data. Please try again.",severity:"error"});
            
    }

    }
   
    const hideAlert = () => {
        setAlertstate({ ...alertState, open: false });
      };
    return(
        <PageTemplate title="Add/Update Users">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(users!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.AccountId}
type ={"number"}
onChange={(e)=>{setUsers({...users,AccountId:e.target.value});checkErrors()}}
defaultValue ={users.AccountId}
error ={(errorMessages.AccountId)?true:false}
label ={"AccountId"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.UserName}
type ={"text"}
onChange={(e)=>{setUsers({...users,UserName:e.target.value});checkErrors()}}
defaultValue ={users.UserName}
error ={(errorMessages.UserName)?true:false}
label ={"UserName"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.Password}
type ={"password"}
onChange={(e)=>{setUsers({...users,Password:e.target.value});checkErrors()}}
defaultValue ={users.Password}
error ={(errorMessages.Password)?true:false}
label ={"Password"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.Email}
type ={"email"}
onChange={(e)=>{setUsers({...users,Email:e.target.value});checkErrors()}}
defaultValue ={users.Email}
error ={(errorMessages.Email)?true:false}
label ={"Email"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.IsActive}
type ={"number"}
onChange={(e)=>{setUsers({...users,IsActive:e.target.value});checkErrors()}}
defaultValue ={users.IsActive}
error ={(errorMessages.IsActive)?true:false}
label ={"IsActive"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.IsAdmin}
type ={"number"}
onChange={(e)=>{setUsers({...users,IsAdmin:e.target.value});checkErrors()}}
defaultValue ={users.IsAdmin}
error ={(errorMessages.IsAdmin)?true:false}
label ={"IsAdmin"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.LastLoginTime}
type ={"date"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setUsers({...users,LastLoginTime:e.target.value});checkErrors()}}
defaultValue ={users.LastLoginTime}
error ={(errorMessages.LastLoginTime)?true:false}
label ={"LastLoginTime"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.CreatedDate}
type ={"date"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setUsers({...users,CreatedDate:e.target.value});checkErrors()}}
defaultValue ={users.CreatedDate}
error ={(errorMessages.CreatedDate)?true:false}
label ={"CreatedDate"}/>
</ Grid >
<Grid xs={12} md={6} key={"8"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.Creator}
type ={"number"}
onChange={(e)=>{setUsers({...users,Creator:e.target.value});checkErrors()}}
defaultValue ={users.Creator}
error ={(errorMessages.Creator)?true:false}
label ={"Creator"}/>
</ Grid >
<Grid xs={12} md={6} key={"9"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.ModifiedDate}
type ={"date"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setUsers({...users,ModifiedDate:e.target.value});checkErrors()}}
defaultValue ={users.ModifiedDate}
error ={(errorMessages.ModifiedDate)?true:false}
label ={"ModifiedDate"}/>
</ Grid >
<Grid xs={12} md={6} key={"10"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.Modifier}
type ={"number"}
onChange={(e)=>{setUsers({...users,Modifier:e.target.value});checkErrors()}}
defaultValue ={users.Modifier}
error ={(errorMessages.Modifier)?true:false}
label ={"Modifier"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"11"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/users')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"12"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button variant={"contained"} color="primary"  type={"Sumbit"}>Save</Button>
</Grid>
</Grid>

                        </Grid>
                        :null}
                </form>
                
               
                </CardContent>
                </Card>
                <Snackbar autoHideDuration={6000}
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={hideAlert}
                    key={vertical + horizontal}>
                       <Alert onClose={hideAlert}  severity={severity}>
                       {message}
                    </Alert>
                </Snackbar>
        </PageTemplate>
    )
}

export default withRouter(UsersAddUpdatePage)
