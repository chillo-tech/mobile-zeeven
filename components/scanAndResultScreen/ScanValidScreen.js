import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Button } from 'react-native';


import { ApplicationContext } from '../../context/ApplicationContextProvider';


function ScanValidScreen({ navigation ,route}) {
    /* 2. Get the param */

  const [guest, setGuest] = useState({})
  const { state } = useContext(ApplicationContext);
  const { eventGuests } = state
  const { guestId }  = route.params;

  
  useEffect(() => {
   
    getGuest();
    
  }, []);


  const checkInValidGuest = () => {
    getGuest()
  

     navigation.navigate('Home', { 
      screen: 'Invités',
      params: { guest: guest},
    });
  
  
  }


  const getGuest = () =>{
      const guest = eventGuests.filter((guest) =>  JSON.parse(guest).id === guestId);
      setGuest(JSON.parse(guest))    
  }


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor : 'green'}}>
      
      <Text>First Name : {guest.firstName}</Text> 
      <Text>Email : {guest.email}</Text>    
      <Text>Phone : {guest.phone}</Text> 
    
      <Button title='Check IN' onPress={() => checkInValidGuest()}/>
      
    </View>

  )
}

export  {ScanValidScreen}