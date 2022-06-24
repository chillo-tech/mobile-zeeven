import React, { useContext, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScanScreen, ScanValidScreen, ScanNonValidScreen } from '../components/scanAndResultScreen';
import { CheckInScreen, GuestProfile } from '../components/checkInScreen';
import { ApplicationContext } from '../context/ApplicationContextProvider';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function Home() {

  const { state } = useContext(ApplicationContext)
  const { numberCheckIn } = state


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
              options={{ 
                tabBarBadge:  (numberCheckIn) ? numberCheckIn : 0 }}
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
            <Stack.Screen name="Guest_Profile" component={GuestProfile} />

        </Stack.Navigator>
    )
}

export default ScanStack;


