import React, { useContext } from 'react';
import DrawerNavigator from '../drawer/DrawerNavigator';
import { AuthContext } from '../../Contexts/AuthProviderContext';
import AuthStack from '../../Stacks/AuthStack';

const Parent = () => {
  const { user } = useContext(AuthContext);
  if(user)
    {
      return <DrawerNavigator />
    }
    else{ 
      return <AuthStack/>
    }
};

export default Parent;