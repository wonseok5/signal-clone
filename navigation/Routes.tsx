import React, {useContext} from 'react';
import {AuthContext} from './AuthProvider';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import LoadingStack from './LoadingStack';
const Routes = () => {
  const {userInfo} = useContext(AuthContext as any);
  return !userInfo || userInfo.loading ? (
    <LoadingStack />
  ) : userInfo.login && !userInfo.loginProcess ? (
    <HomeStack />
  ) : (
    <AuthStack />
  );
};

export default Routes;
