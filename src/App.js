import React, {useEffect, useState} from 'react';
import './App.css';
import getToken from "./auth/auth";
import Routes from './Routes';
import {Loading} from "./components/templates/Loading";
function App() {
    console.disableYellowBox = true;
  // Uso el estado para volver a renderizar la tabla cuando el token está disponible
  // A veces, el Token no está presente en la sesión y debe obtenerse mediante una llamada a la API
    const [jwt, setJwt] = useState( undefined);

  // Si el Token no está disponible en Session, solicítelo a la API.
  // Puede usar esto para autenticarse.

    useEffect(()=>{
        getToken(setJwt,"user1","password1")},[]);

        if(jwt){
            return ( <div className="App">
              <Routes />
              </div>
            );
        }else{
          return (
            <div className="App">
             <Loading />
            </div>
          );
        }
}

export default App;
