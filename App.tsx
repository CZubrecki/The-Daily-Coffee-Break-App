import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Screens/Home';
import ExtractionLog from './Screens/ExtractionLog';
import { ActivityIndicator, Button } from 'react-native';
import ExtractionDetails from './Screens/ExtractionDetails';
import Login from './Screens/Login';
import SignUp from './Screens/SignUp';
import { View } from 'react-native';
import { AuthContext } from './Components/context';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();

export default function App() {
  const initialLoginState = {
    isLoading: true,
    email: null,
    token: null,
  }

  const loginReducer = (prevState: any, action: any) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          token: action.token,
          isLoading: false
        };
      case 'LOGIN':
        return {
          ...prevState,
          email: action.id,
          token: action.token,
          isLoading: false
        };
      case 'LOGOUT':
        return {
          ...prevState,
          email: null,
          token: null,
          isLoading: false
        };
      case 'SIGNUP':
        return {
          ...prevState,
          email: action.id,
          token: action.token,
          isLoading: false
        };
    }
  }

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(() => ({
    login: async (email: string, password: string) => {
      await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        })
      }).then((response) => response.json())
        .then(async (responseJson: any) => {
          if (responseJson && responseJson.user?.token) {
            try {
              await AsyncStorage.setItem('token', responseJson.user.token);
            } catch (err) {
              console.log(err);
            }
            dispatch({ type: 'LOGIN', id: responseJson.user.email, token: responseJson.user.token, userId: responseJson.user.id });
          }
        }).catch((error: any) => {
          Alert.alert(error);
        });
    },
    logout: async () => {
      try {
        await AsyncStorage.removeItem('token');
      } catch (err) {
        console.log(err);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: async (email: string, password: string) => {
      await fetch('http://localhost:8080/auth/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        })
      }).then((response) => response.json())
        .then(async (responseJson: any) => {
          if (responseJson && responseJson.user?.token) {
            try {
              await AsyncStorage.setItem('token', responseJson.user.token);
            } catch (err) {
              console.log(err);
            }
            dispatch({ type: 'SIGNUP', id: responseJson.user.email, token: responseJson.user.token, userId: responseJson.user.id });
          }
        }).catch((error: any) => {
          Alert.alert(error);
        });
    },
  }), []);

  useEffect(() => {
    setTimeout(async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        dispatch({ type: 'RETRIEVE_TOKEN', token: token });
      } catch (err) {
        console.log(err);
      }
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: '#e6ddc5',
          },
          headerTitleStyle: {
            color: '#583A25',
          },
          headerBackTitleStyle: {
            color: '#583A25',
          },
          headerTintColor: '#583A25',
        }}>
          {loginState.token && loginState.email ?
            <>
              <Stack.Screen
                name="Home"
                component={Home}
                options={({ navigation, route }) => ({
                  headerLeft: () => (
                    <Button
                      color={'#583A25'}
                      onPress={() => authContext.logout()}
                      title="Logout"
                    />
                  ),
                  headerRight: () => (
                    <Button
                      color={'#583A25'}
                      onPress={() => navigation.navigate('ExtractionLog')}
                      title="Add"
                    />
                  ),
                })
                }
              />
              <Stack.Screen
                name="ExtractionLog"
                component={ExtractionLog}
                options={{
                  headerTitle: 'Add Extraction Log',
                }}
              />
              <Stack.Screen
                name="ExtractionDetails"
                component={ExtractionDetails}
                options={{
                  headerTitle: 'Extraction Details',
                }}
              />
            </> :
            <>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  headerTitle: '',
                }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{
                  headerTitle: '',
                }} />
            </>
          }
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
