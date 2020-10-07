import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Screens/Home';
import ExtractionLog from './Screens/ExtractionLog';
import { Button } from 'react-native';
import ExtractionDetails from './Screens/ExtractionDetails';
import AsyncStorage from '@react-native-community/async-storage';
import Login from './Screens/Login';
import SignUp from './Screens/SignUp';

const Stack = createStackNavigator();

export default function App() {
  const [token, setToken] = useState<string | null>();

  const isLoggedIn = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      setToken(token);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
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
        {!!token ?
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={({ navigation, route }) => ({
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
  );
}
