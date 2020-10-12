import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Screens/Home';
import ExtractionLog from './Screens/ExtractionLog';
import { ActivityIndicator, Alert, Button } from 'react-native';
import ExtractionDetails from './Screens/ExtractionDetails';
import Login from './Screens/Login';
import SignUp from './Screens/SignUp';
import { View } from 'react-native';
import { AuthContext } from './Components/context';
import AsyncStorage from '@react-native-community/async-storage';
import { authLogin, authSignUp } from './api/AuthAPI';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
      try {
        const value = await authLogin(email, password);
        if (value) {
          dispatch({ type: 'LOGIN', id: value.user.email, token: value.user.token, userId: value.user.id });
        }
      } catch (error) {
        Alert.alert(error);
      }
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
      try {
        const value = await authSignUp(email, password);
        dispatch({ type: 'SIGNUP', id: value.user.email, token: value.user.token, userId: value.user.id });
      } catch (error) {
        Alert.alert(error);
      }
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
            backgroundColor: '#75604d',
            shadowColor: 'transparent'
          },
          headerTitleStyle: {
            color: '#E6DDC5',
          },
          headerBackTitleStyle: {
            color: '#E6DDC5',
          },
          headerTintColor: '#E6DDC5',
        }}>
          {loginState.token && loginState.email ?
            <>
              <Stack.Screen
                name="Home"
                component={Home}
                options={({ navigation, route }) => ({
                  headerLeft: () => (
                    <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => authContext.logout()}>
                      <FontAwesomeIcon size={20} icon={faSignOutAlt} style={{ color: '#E6DDC5' }} />
                    </TouchableOpacity>
                  ),
                  headerRight: () => (
                    <TouchableOpacity style={{ marginRight: 15 }} onPress={() => navigation.navigate('ExtractionLog')}>
                      <FontAwesomeIcon size={20} icon={faPlus} style={{ color: '#E6DDC5' }} />
                    </TouchableOpacity>
                  ),
                })}
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
