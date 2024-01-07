import React, { useContext, useEffect, useState } from 'react';
import DrawerNavigator from '../drawer/DrawerNavigator';
import { AuthContext } from '../../Contexts/AuthProviderContext';
import AuthStack from '../../Stacks/AuthStack';
import { auth } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { ActivityIndicator } from 'react-native';
import { COLORS } from '../../components/constants';

const Parent = () => {
  const { user, setUser, authLoading } = useContext(AuthContext);
  const[ initializing, setInitializing ] = useState();
  const onAuthStateChangedCallback = (user_data)=>{
    setUser(user_data);
    console.log("User: "+JSON.stringify(user_data));
    setInitializing(false);
  }
  useEffect(()=>{
    onAuthStateChanged(auth, onAuthStateChangedCallback);
      // setUser(null);
      // return subscriber;
  },[]);
  if(initializing)
  {
    return null;
  }
  // if(authLoading)
  // {
  //   return <ActivityIndicator size={"large"} color={COLORS.primary} />
  // }
  return(
    <>
    {
      user ? <DrawerNavigator/> : <AuthStack/>
    }
    </>
  );
};

export default Parent;