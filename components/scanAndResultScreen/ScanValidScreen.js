import React from 'react'
import { View, Text, Button } from 'react-native';


function ScanValidScreen({ navigation ,route}) {
    /* 2. Get the param */
  const { guest }  = route.params;

  const checkInValidGuest = (guest) => {
   
    navigation.navigate('Home', { 
      screen: 'Invités',
      params: { guest: guest},
    });
  }


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor : 'green'}}>
      <Text>First Name : {JSON.stringify(guest.name)}</Text> 
      <Text>Email : {JSON.stringify(guest.email)}</Text>    
      <Text>Phone : {JSON.stringify(guest.telephone)}</Text> 

      <Button title='Check IN' onPress={() => checkInValidGuest(guest)}/>
      
    </View>

  )
}

export default ScanValidScreen