import React, { useContext, useEffect } from 'react';
import authContext from '../context/auth/authContext';
const DetailLogin = ({anchorAccountEl}) => {
  

   //acceder al state
   const AuthContext = useContext(authContext);

   const {
     user,
     autenticateUser,
     loginClose,
   } = AuthContext;

   useEffect(() => {
     autenticateUser()
   }, []);


    const open = Boolean(anchorAccountEl);
    return ( 
        <div>Detaul Login</div>
     );
}
 
export default DetailLogin;