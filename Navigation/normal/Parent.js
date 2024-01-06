import React, { useContext, useEffect, useState } from 'react';
import DrawerNavigator from '../drawer/DrawerNavigator';
import { AuthContext } from '../../Contexts/AuthProviderContext';
import AuthStack from '../../Stacks/AuthStack';
import { auth } from '../../firebaseConfig';

const Parent = () => {
  const { user, setUser } = useContext(AuthContext);
  const[ initializing, setInitializing ] = useState();
  const onAuthStateChanged = (user_data)=>{
    setUser(user_data);
    setInitializing(false);
  }
  useEffect(()=>{
      const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
      return subscriber;
  },[]);
  if(initializing)
  {
    return null;
  }
  // if(user)
  //   {
  //     return <DrawerNavigator />
  //   }
  //   else{ 
  //     return <AuthStack/>
  //   }
  return(
    <>
    {
      user ? <DrawerNavigator/> : <AuthStack/>
    }
    </>
  );
};

export default Parent;