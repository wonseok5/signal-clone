/* eslint-disable react-hooks/exhaustive-deps */
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {createContext, useCallback, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import React from 'react';
export interface User {
  uid: string;
  email: string;
  photoUrl: string;
  displayName: string;
}

export const AuthContext: React.Context<{}> = createContext({});

export const AuthProvider = ({children}: any) => {
  const [user, setUser] = useState({} as FirebaseAuthTypes.User | null);
  const [userInfo, setUserInfo] = useState({
    loading: true,
    login: false,
    loginProcess: false,
  } as any);

  const updateUserInfo = useCallback(
    (u: FirebaseAuthTypes.User) => {
      setUserInfo({
        ...userInfo,
        uid: u.uid,
        displayName: u.displayName,
        photoUrl: u.photoURL,
        email: u.email,
        login: true,
        loading: false,
        loginProcess: false,
      });
    },
    [userInfo],
  );
  const logout = useCallback(() => {
    if (auth().currentUser) {
      auth()
        .signOut()
        .then()
        .catch(error => console.error(error));
    }
  }, []);

  const register = useCallback(
    (email: string, password: string, name: string, imageUrl: string) => {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(authUser => {
          return authUser.user.updateProfile({
            displayName: name,
            photoURL:
              imageUrl ||
              'https://www.pngkit.com/png/full/302-3022217_roger-berry-avatar-placeholder.png',
          });
        })
        .then(_ => {
          auth().signInWithEmailAndPassword(email, password);
        })
        .catch(error => console.error(error));
    },
    [],
  );

  const login = useCallback((email, password) => {
    setUserInfo({...userInfo, loading: true});
    auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (!user) {
      setUserInfo({login: false, loading: false, loginProcess: true});
    } else if (user && user.uid) {
      updateUserInfo(user);
    }
  }, [user]);
  useEffect(() => {
    const unsub = auth().onAuthStateChanged(u => {
      setUser(u);
    });
    return unsub;
  }, []);
  return (
    <AuthContext.Provider
      value={{user, setUser, userInfo, setUserInfo, logout, login, register}}>
      {children}
    </AuthContext.Provider>
  );
};
