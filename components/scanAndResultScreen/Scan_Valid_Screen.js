import React from 'react'
import { View, Text } from 'react-native';


function Scan_Valid_Screen({route}) {
    /* 2. Get the param */
  const {  
    firstName,
    email, 
    phone 
  } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor : 'green'}}>
      <Text>First Name : {JSON.stringify(firstName)}</Text> 
      <Text>Email : {JSON.stringify(email)}</Text>    
      <Text>Phone : {JSON.stringify(phone)}</Text>       
    </View>

  )
}

export default Scan_Valid_Screen