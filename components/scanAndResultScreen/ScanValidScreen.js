import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Button,StyleSheet } from 'react-native';


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
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 20}}>Information sur l'Invité</Text>
      <View>
        <Text style={styles.sectionTitle}>Liste des Prenoms </Text>
        <Text  style={styles.userInfo}> {guest.firstName} </Text> 
      </View>
      
      <View>
        <Text style={styles.sectionTitle}> Email </Text>
        <Text  style={styles.userInfo}> {guest.email} </Text> 
      </View>

      <View>
        <Text style={styles.sectionTitle}> Phone </Text>
        <Text style={styles.userInfo}> {guest.phone} </Text> 
      </View>
    
      <Button title='Check IN' onPress={() => checkInValidGuest()}/>
      
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    flexDirection: 'column',
    padding: 35,
    justifyContent:'space-between',
    paddingBottom: 400
    /*
    display: "flex",
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor : 'green',   
    */
     
  },

  userInfo:{
    fontSize: 15

  },

  sectionTitle:{
    color: "#006080",
    fontWeight: "bold",
    fontSize: 17
  }


});

export  {ScanValidScreen}