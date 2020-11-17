import React, { useEffect, useMemo, useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Screens/Home';
import ExtractionLog from './Screens/ExtractionLog';
import { Alert } from 'react-native';
import ExtractionDetails from './Screens/ExtractionDetails';
import Login from './Screens/Login';
import { AuthContext } from './Components/context';
import AsyncStorage from '@react-native-community/async-storage';
import { authLogin, authSignUp } from './Api/AuthApi';
import FilterPage from './Screens/FilterPage';
import SplashScreen from './Screens/SplashScreen';

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
      <SplashScreen />
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
            color: '#FFF',
            fontFamily: 'Helvetica',
            fontWeight: '300',
          },
          headerTintColor: '#FFF',
        }}>
          {loginState.token && loginState.email ?
            <>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ExtractionLog"
                component={ExtractionLog}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ExtractionDetails"
                component={ExtractionDetails}
                options={{
                  headerTitle: 'Extraction Details',
                }}
              />
              <Stack.Screen
                name="FilterPage"
                component={FilterPage}
                options={{
                  headerTitle: 'Filters',
                }}
              />
            </> :
            <>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  headerShown: false,
                }}
              />
            </>
          }
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
