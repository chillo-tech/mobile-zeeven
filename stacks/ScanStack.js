import React, { useContext } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {StyleSheet} from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScanScreen, ScanValidScreen, ScanNonValidScreen, EventListScreen } from '../components/scanAndResultScreen';
import { CheckInScreen, GuestProfile, GuestList } from '../components/checkInScreen';
import { ApplicationContext } from '../context/ApplicationContextProvider';
import { DropDown } from './dropdown';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function Home() {

  const { state, signOut } = useContext(ApplicationContext)
  const guests = state.eventGuests
  const checkIn = state.checkInGuests


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

                } else if (route.name === 'Events') {
                  iconName = focused ? 'school-outline' : 'school';

                } else if (route.name === 'Guest List') {
                  iconName = focused ? 'document-text-outline' : 'document-text';
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              
              tabBarActiveTintColor: '#004aab',
              tabBarInactiveTintColor: 'gray',
              
            })}      
          >
        <Tab.Screen 
            name="Events"  
            component={EventListScreen}  
            options={{ headerTitle: "Events", 
              headerRight: () => (
                <DropDown
                      
                />
              )}}         
          />
        
        <Tab.Screen name="Scanner" component={ScanScreen} 
            options={{ headerShown: false }}
              />

         <Tab.Screen 
              name="Guest List" 
              options={{ 
              tabBarBadge:  guests ? guests.length : 0 }}
              component={GuestList} />     
        <Tab.Screen name="Invités" 
              options={{ 
              tabBarBadge:   checkIn ? checkIn.length : 0 }}
              component={CheckInScreen} />

        
    </Tab.Navigator>
  );
}

function ScanStack(){
 // navigator.setOptions({tabBarVisible: false})
    return(
        <Stack.Navigator initialRouteName="Home">          
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
            <Stack.Screen name="Scan_Valid" component={ScanValidScreen}
              options={{ headerTitle: ""}} />
            <Stack.Screen name="Scan_Non_Valid" component={ScanNonValidScreen}
              options={{ headerTitle: "", 
              headerRight: () => (
                <Ionicons name="home-sharp" 
                 
                />
              )}}/>
            <Stack.Screen name="Guest_Profile" component={GuestProfile} />

        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
  tabCustomStyle : {
  
    
  }
 
  
});


export default ScanStack;


