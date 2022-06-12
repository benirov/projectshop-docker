import React, { useContext } from 'react';

import authContext from '../context/auth/authContext';
//import appContext from '../context/app/appContext';   


const AlertComponent = () => {

    //acceder al state
  const AuthContext = useContext(authContext);
  //const AppContext = useContext(appContext);

  const { message, type } = AuthContext;
  //const { mensajeArchivo } = AppContext;
    return ( 
      <div className={`alert text-center alert-${type}`} variant="outlined" severity={`text-${type}`}>
          {message}
      </div>
     );
}
 
export default AlertComponent;