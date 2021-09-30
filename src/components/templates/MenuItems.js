import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TableChartIcon from '@material-ui/icons/TableChart';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import history from './../../history';

export const mainListItems = (
  <div>
    <ListItem button onClick={() => history.push('/dashboard')}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button onClick={() => history.push('/customer')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Clientes" />
</ListItem><ListItem button onClick={() => history.push('/customerlog')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Log de Clientes" />
</ListItem><ListItem button onClick={() => history.push('/document')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Tarjetas de Regalo" />
</ListItem><ListItem button onClick={() => history.push('/documentlog')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Log Documentos" />
</ListItem><ListItem button onClick={() => history.push('/users')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Users" />
</ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListItem button onClick={() => history.push('/signup')}>
      <ListItemIcon>
        <LockOpenIcon />
      </ListItemIcon>
      <ListItemText primary="SignUp" />
    </ListItem>
    <ListItem button onClick={() => history.push('/')}>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
   
  </div>
);
