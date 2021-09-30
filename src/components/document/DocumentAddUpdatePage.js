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
import {addDocument, getDocument,getOneDocument, updateDocument} from "../../repo/documentRepo";
import {getCustomer} from "../../repo/customerRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const DocumentAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [document,setDocument] = useState(undefined)
    const [customer,setCustomer] = useState(undefined)


    const checkErrors = () => {
        let errorList = {}
        if(document.CustomerId === "" || document.CustomerId === undefined)
{
   errorList = { ...errorList,CustomerId: "¡Campo requerido!"}
}
if(document.DocType === "" || document.DocType === undefined)
{
   errorList = { ...errorList,DocType: "¡Campo requerido!"}
}
if(document.DocIdentity === "" || document.DocIdentity === undefined)
{
   errorList = { ...errorList,DocIdentity: "¡Campo requerido!"}
}
if(document.CreatedDate === "" || document.CreatedDate === undefined)
{
   errorList = { ...errorList,CreatedDate: "¡Campo requerido!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
    getCustomer(0,200,"").then((res)=>{ setCustomer(res.records) })

      
        if(props.match.params.id) {
            getOneDocument(props.match.params.id).then((res) => {
                setDocument(res.data.document)
            })
        }else{
            setDocument({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (document.DocumentId) {
               var updateResponse =  await updateDocument(document.DocumentId,document);
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
                var addResponse = await addDocument(document)
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
        <PageTemplate title="Add/Update Document">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(document!==undefined  && customer!==undefined)?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.DocType}
type ={"number"}
onChange={(e)=>{setDocument({...document,DocType:e.target.value});checkErrors()}}
defaultValue ={document.DocType}
error ={(errorMessages.DocType)?true:false}
label ={"DocType"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.DocIdentity}
type ={"text"}
onChange={(e)=>{setDocument({...document,DocIdentity:e.target.value});checkErrors()}}
defaultValue ={document.DocIdentity}
error ={(errorMessages.DocIdentity)?true:false}
label ={"DocIdentity"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.CreatedDate}
type ={"date"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setDocument({...document,CreatedDate:e.target.value});checkErrors()}}
defaultValue ={document.CreatedDate}
error ={(errorMessages.CreatedDate)?true:false}
label ={"CreatedDate"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.ActivateDate}
type ={"date"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setDocument({...document,ActivateDate:e.target.value});checkErrors()}}
defaultValue ={document.ActivateDate}
error ={(errorMessages.ActivateDate)?true:false}
label ={"ActivateDate"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.CancelDate}
type ={"date"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setDocument({...document,CancelDate:e.target.value});checkErrors()}}
defaultValue ={document.CancelDate}
error ={(errorMessages.CancelDate)?true:false}
label ={"CancelDate"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.InAmount}
type ={"number"}
onChange={(e)=>{setDocument({...document,InAmount:e.target.value});checkErrors()}}
defaultValue ={document.InAmount}
error ={(errorMessages.InAmount)?true:false}
label ={"InAmount"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.OutAmount}
type ={"number"}
onChange={(e)=>{setDocument({...document,OutAmount:e.target.value});checkErrors()}}
defaultValue ={document.OutAmount}
error ={(errorMessages.OutAmount)?true:false}
label ={"OutAmount"}/>
</ Grid >
<Grid xs={12} md={6} key={"8"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.BalanceAmount}
type ={"number"}
onChange={(e)=>{setDocument({...document,BalanceAmount:e.target.value});checkErrors()}}
defaultValue ={document.BalanceAmount}
error ={(errorMessages.BalanceAmount)?true:false}
label ={"BalanceAmount"}/>
</ Grid >
<Grid xs={12} md={6} key={"9"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.DocStatus}
type ={"text"}
onChange={(e)=>{setDocument({...document,DocStatus:e.target.value});checkErrors()}}
defaultValue ={document.DocStatus}
error ={(errorMessages.DocStatus)?true:false}
label ={"DocStatus"}/>
</ Grid >
<Grid xs={12} md={6} key={"10"} item >
<InputLabel style={{textAlign: 'left'}}>CustomerId</InputLabel>
        <Select style={{width: '100%',textAlign: 'left'}}
                              labelId ="CustomerId"
                              id="CustomerId"
                              value={document.CustomerId}
                              onChange ={(e)=>{setDocument({...document,CustomerId:e.target.value});checkErrors()}}>
                              {customer.map((key)=><MenuItem key={key.CustomerId} value={key.CustomerId}>{key.CustName}</MenuItem>)}
                          </Select>
    </Grid>
<Grid xs={12}  md={6} item key={"11"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/document')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
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

export default withRouter(DocumentAddUpdatePage)
