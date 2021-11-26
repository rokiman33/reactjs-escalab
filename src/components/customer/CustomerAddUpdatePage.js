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
import {addCustomer, getCustomer,getOneCustomer, updateCustomer} from "../../repo/customerRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const CustomerAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [customer,setCustomer] = useState(undefined)
    

    const checkErrors = () => {
        let errorList = {}
        if(customer.CustName === "" || customer.CustName === undefined)
{
   errorList = { ...errorList,CustName: "¡Campo requerido!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    
      
        if(props.match.params.id) {
            getOneCustomer(props.match.params.id).then((res) => {
                setCustomer(res.data.document)
            })
        }else{
            setCustomer({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (customer.CustomerId) {
               var updateResponse =  await updateCustomer(customer.CustomerId,customer);
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
                var addResponse = await addCustomer(customer)
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
        <PageTemplate title="Agrega o Modificar Cliente">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(customer!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.CustName}
type ={"text"}
onChange={(e)=>{setCustomer({...customer,CustName:e.target.value});checkErrors()}}
defaultValue ={customer.CustName}
error ={(errorMessages.CustName)?true:false}
label ={"CustName"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.CustIdentity}
type ={"text"}
onChange={(e)=>{setCustomer({...customer,CustIdentity:e.target.value});checkErrors()}}
defaultValue ={customer.CustIdentity}
error ={(errorMessages.CustIdentity)?true:false}
label ={"CustIdentity"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.CustCert}
type ={"text"}
onChange={(e)=>{setCustomer({...customer,CustCert:e.target.value});checkErrors()}}
defaultValue ={customer.CustCert}
error ={(errorMessages.CustCert)?true:false}
label ={"CustCert"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.CustDocType}
type ={"number"}
onChange={(e)=>{setCustomer({...customer,CustDocType:e.target.value});checkErrors()}}
defaultValue ={customer.CustDocType}
error ={(errorMessages.CustDocType)?true:false}
label ={"CustDocType"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.CustFinalDate}
type ={"date"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setCustomer({...customer,CustFinalDate:e.target.value});checkErrors()}}
defaultValue ={customer.CustFinalDate}
error ={(errorMessages.CustFinalDate)?true:false}
label ={"CustFinalDate"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.CustActivationDate}
type ={"date"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setCustomer({...customer,CustActivationDate:e.target.value});checkErrors()}}
defaultValue ={customer.CustActivationDate}
error ={(errorMessages.CustActivationDate)?true:false}
label ={"CustActivationDate"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.CustSale}
type ={"number"}
onChange={(e)=>{setCustomer({...customer,CustSale:e.target.value});checkErrors()}}
defaultValue ={customer.CustSale}
error ={(errorMessages.CustSale)?true:false}
label ={"CustSale"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.CustPay}
type ={"number"}
onChange={(e)=>{setCustomer({...customer,CustPay:e.target.value});checkErrors()}}
defaultValue ={customer.CustPay}
error ={(errorMessages.CustPay)?true:false}
label ={"CustPay"}/>
</ Grid >
<Grid xs={12} md={6} key={"8"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.CustReLoad}
type ={"number"}
onChange={(e)=>{setCustomer({...customer,CustReLoad:e.target.value});checkErrors()}}
defaultValue ={customer.CustReLoad}
error ={(errorMessages.CustReLoad)?true:false}
label ={"CustReLoad"}/>
</ Grid >
<Grid xs={12} md={6} key={"9"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.CustStatus}
type ={"text"}
onChange={(e)=>{setCustomer({...customer,CustStatus:e.target.value});checkErrors()}}
defaultValue ={customer.CustStatus}
error ={(errorMessages.CustStatus)?true:false}
label ={"CustStatus"}/>
</ Grid >
<Grid xs={12} md={6} key={"10"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.CustInfoAdic1}
type ={"text"}
onChange={(e)=>{setCustomer({...customer,CustInfoAdic1:e.target.value});checkErrors()}}
defaultValue ={customer.CustInfoAdic1}
error ={(errorMessages.CustInfoAdic1)?true:false}
label ={"CustInfoAdic1"}/>
</ Grid >
<Grid xs={12} md={6} key={"11"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.CustInfoAdic2}
type ={"text"}
onChange={(e)=>{setCustomer({...customer,CustInfoAdic2:e.target.value});checkErrors()}}
defaultValue ={customer.CustInfoAdic2}
error ={(errorMessages.CustInfoAdic2)?true:false}
label ={"CustInfoAdic2"}/>
</ Grid >
<Grid xs={12} md={6} key={"12"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.CustInfoAdic3}
type ={"text"}
onChange={(e)=>{setCustomer({...customer,CustInfoAdic3:e.target.value});checkErrors()}}
defaultValue ={customer.CustInfoAdic3}
error ={(errorMessages.CustInfoAdic3)?true:false}
label ={"CustInfoAdic3"}/>
</ Grid >
<Grid xs={12} md={6} key={"13"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.CustInfoAdic4}
type ={"text"}
onChange={(e)=>{setCustomer({...customer,CustInfoAdic4:e.target.value});checkErrors()}}
defaultValue ={customer.CustInfoAdic4}
error ={(errorMessages.CustInfoAdic4)?true:false}
label ={"CustInfoAdic4"}/>
</ Grid >
<Grid xs={12} md={6} key={"14"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.CustDateAdic1}
type ={"date"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setCustomer({...customer,CustDateAdic1:e.target.value});checkErrors()}}
defaultValue ={customer.CustDateAdic1}
error ={(errorMessages.CustDateAdic1)?true:false}
label ={"CustDateAdic1"}/>
</ Grid >
<Grid xs={12} md={6} key={"15"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.CustDateAdic2}
type ={"date"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setCustomer({...customer,CustDateAdic2:e.target.value});checkErrors()}}
defaultValue ={customer.CustDateAdic2}
error ={(errorMessages.CustDateAdic2)?true:false}
label ={"CustDateAdic2"}/>
</ Grid >
<Grid xs={12} md={6} key={"16"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.CustValueAdic1}
type ={"number"}
onChange={(e)=>{setCustomer({...customer,CustValueAdic1:e.target.value});checkErrors()}}
defaultValue ={customer.CustValueAdic1}
error ={(errorMessages.CustValueAdic1)?true:false}
label ={"CustValueAdic1"}/>
</ Grid >
<Grid xs={12} md={6} key={"17"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.CustValueAdic2}
type ={"number"}
onChange={(e)=>{setCustomer({...customer,CustValueAdic2:e.target.value});checkErrors()}}
defaultValue ={customer.CustValueAdic2}
error ={(errorMessages.CustValueAdic2)?true:false}
label ={"CustValueAdic2"}/>
</ Grid >
<Grid xs={12} md={6} key={"18"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.CustValueAdic3}
type ={"number"}
onChange={(e)=>{setCustomer({...customer,CustValueAdic3:e.target.value});checkErrors()}}
defaultValue ={customer.CustValueAdic3}
error ={(errorMessages.CustValueAdic3)?true:false}
label ={"CustValueAdic3"}/>
</ Grid >
<Grid xs={12} md={6} key={"19"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.CustomerId}
type ={"number"}
onChange={(e)=>{setCustomer({...customer,CustomerId:e.target.value});checkErrors()}}
defaultValue ={customer.CustomerId}
error ={(errorMessages.CustomerId)?true:false}
label ={"ID Cliente"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"19"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/customer')} variant={"contained"} type={"Button"} color="secondary">Cancelar</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"20"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button variant={"contained"} color="primary"  type={"Sumbit"}>Grabar</Button>
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

export default withRouter(CustomerAddUpdatePage)
