import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Button,StyleSheet, Image } from 'react-native'


import { ApplicationContext } from '../../context/ApplicationContextProvider';


function ScanValidScreen({ navigation ,route}) {
    /* 2. Get the param */

  const [guestValid, setGuestState] = useState({})
  const { state } = useContext(ApplicationContext);
  const { eventGuests } = state
  const { guest }  = route.params;

  
  useEffect(() => {
   
    getGuest();
    
  }, []);


  const checkInValidGuest = () => {
    getGuest()
  

     navigation.navigate('Home', { 
      screen: 'Invités',
      params: { guest: guestValid},
    });
  }


  const getGuest = () =>{
      const guestadd = eventGuests.filter((validGuest) =>  validGuest.id === guest.id);
      setGuestState(...guestadd)    
  }

  return (
    <>
      <View style={{  flexDirection: 'row', margin: "auto", backgroundColor: "#fff", paddingBottom:4}}>
        <Image source={require("../../assets/greenCheckmark.png")} 
        style={{ height:28,
                resizeMode: 'contain',
                marginLeft:-90,
                marginRight:-90,  
                padding:-100
                }}/>
        <Text style={styles.scanValideTitle}>Valide</Text>
      </View>

      <View style={styles.container}>
        
        <Text style={{ fontWeight: "bold", fontSize: 22,paddingBottom: 15 }}>Information sur l'Invité</Text>
        <View>
          <Text style={styles.sectionTitle}>Liste des Prenoms </Text>
          <Text  style={styles.userInfo}> {guestValid.firstName} </Text> 
        </View>

        <View>
          <Text style={styles.sectionTitle}>Nom</Text>
          <Text  style={styles.userInfo}> {guestValid.lastName} </Text> 
        </View>
        
        <View>
          <Text style={styles.sectionTitle}> Email </Text>
          <Text  style={styles.userInfo}> {guestValid.email} </Text> 
        </View>

        <View>
          <Text style={styles.sectionTitle}> Phone </Text>
          <Text style={styles.userInfo}> {guestValid.phone} </Text> 
        </View>
      
        <Button title='Check IN' onPress={() => checkInValidGuest()}/>
        
      </View>
    </>

  )
}

const styles = StyleSheet.create({
  scanValideTitle: {
    color: "#1f8514",
    fontWeight: "bold",
    fontSize: 25,
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 15,
    justifyContent:'space-between',
    paddingBottom: 400,
    backgroundColor: "#fff",
    shadowColor: 'red',    
  },
  userInfo:{
    fontSize: 18,
    color: "gray",
    paddingBottom: 20

  },
  sectionTitle:{
    color: "#006080",
    fontWeight: "bold",
    fontSize: 17, 
  }
});

export  {ScanValidScreen}