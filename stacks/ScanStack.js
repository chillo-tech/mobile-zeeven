import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScanScreen, ScanValidScreen, ScanNonValidScreen } from '../components/scanAndResultScreen';
import { CheckInScreen } from '../components/checkInScreen';


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
                component={ScanScreen} 
                options={{
                  headerShown: false
                }}/>
          <Tab.Screen 
                name="Invités" 
                component={CheckInScreen} />
      </Tab.Navigator>
    );
}

function ScanStack(){
    return(
        <Stack.Navigator initialRouteName="Home">          
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
            <Stack.Screen name="Scan_Valid" component={ScanValidScreen} />
            <Stack.Screen name="Scan_Non_Valid" component={ScanNonValidScreen} />
        </Stack.Navigator>
    )
}

export default ScanStack;


