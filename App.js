// In App.js in a new project

import React, { useEffect, useMemo, useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import * as SecureStore from 'expo-secure-store';


import  Check_in_Screen from './components/checkInScreen/Check_in_Screen';
import  Scan_Screen from './components/scanAndResultScreen/Scan_Screen';
import  Scan_Valid_Screen from './components/scanAndResultScreen/Scan_Valid_Screen';
import  Scan_Non_Valid_Screen from './components/scanAndResultScreen/Scan_Non_Valid_Screen';
import  AuthContext  from './context'

//AUTH SCREENS
import  PhoneAuthScreen from './components/authScreen/PhoneAuthScreen'
import  NewUserScreen from './components/authScreen/NewUserScreen'
import  SecretCodeScreen from './components/authScreen/SecretCodeScreen'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function Home() {
  return (
    <Tab.Navigator
          screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Scanner') {
                  iconName = focused
                    ? 'qr-code-outline'
                    : 'qr-code-sharp';
                } else if (route.name === 'Invités') {
                  iconName = focused ? 'people-outline' : 'people-circle-outline';
                  
                  
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'green',
              tabBarInactiveTintColor: 'gray',
            })}
          >
        
        <Tab.Screen 
              name="Scanner" 
              component={Scan_Screen} 
              options={{
                headerShown: false
              }}/>
        <Tab.Screen name="Invités" component={Check_in_Screen} />
    </Tab.Navigator>
  );
}


function App() {


  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => { 
      let userToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        userToken = await SecureStore.getItemAsync('userTken');
        dispatch({ type: 'RESTORE_TOKEN', token: userToken });

      } catch (e) {
        console.log("No USER CONNECTED")
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        dispatch({ type: 'SIGN_IN', token: data  });     
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
       
        dispatch({ type: 'SIGN_IN', token: data  })
      },

      signUpWithPoneNumber: async (phoneNumber) => {
        dispatch({ type: 'SIGN_IN', token: phoneNumber  });
      }, 

      signInNewUser: async (data) => {
        dispatch({ type: 'SIGN_IN_NEW_USER', token: data  });
       },
    }),
    []
  );

  return (

    <AuthContext.Provider value={authContext}>
      <NavigationContainer>

        {state.isLoading ? (
            <View>
                <Text>loading</Text>
            </View>
          ) :

          state.userToken ? (
          <Stack.Navigator initialRouteName="Home">          
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="Scan_Valid"
                component={Scan_Valid_Screen} />
            <Stack.Screen 
                name="Scan_Non_Valid" 
                component={Scan_Non_Valid_Screen} />
          </Stack.Navigator>
          ) :
           (
            <Stack.Navigator initialRouteName="Numero AUTH">
              <Stack.Screen name="Numero AUTH" component={ PhoneAuthScreen } />
              <Stack.Screen name="Secret Code" component={ SecretCodeScreen } />
              <Stack.Screen name="New User"    component={ NewUserScreen } />

            </Stack.Navigator>
          )
          
        }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;