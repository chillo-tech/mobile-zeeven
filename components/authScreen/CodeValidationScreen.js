import React, {useState, useRef, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable, Button, Alert} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { EventListScreen } from '../scanAndResultScreen/EventListScreen';

import { SecurityContext } from '../../context/SecurityContextProvider';
import { ApplicationContext } from '../../context/ApplicationContextProvider';
import { COLOR_BLUE, COLOR_WHITE, TEXT_WHITE } from '../../utils/constants';

const CodeValidationScreen = ({navigation}) => {
  const [phoneNumber, setphoneNumber] = useState('');
  const phoneInput = useRef<PhoneInput>(null);
  var eventState =[]
  
  const { publicAxios } = useContext(SecurityContext);
  const { signIn, setEvents } = useContext(ApplicationContext);


  useEffect(() => {
     
   
   }, [setEvents]);


  const isValidPhoneNumber = (phoneNumber) =>{
    const validLength = (phoneNumber.length == 9 )
    console.log(validLength)
  }

  const buttonPress = async() => {

    try {
      const {data} = await publicAxios.post(
          "connexion", {
            username: "bonjour.zeeven@gmail.com",
            password: "events"
          }
      )


    setEventList(data)
    signIn(data)

       
    } catch (error) {    
      console.log(JSON.stringify(error, null, 2)) 
    }
  }  

  const sendSMS = async(phoneNumber) =>  {
    
    try {

    
    if(isValidPhoneNumber(phoneNumber)){
      const {data} = await publicAxios.post(
          "/phone-activation-code", {
            phone: phoneNumber
          }    
      )

      console.log(data)
    }else{
      Alert.alert("numéro invalide")
    } 

  
    } catch (error) {    
      console.log(JSON.stringify(error, null, 2)) 
    }
  }



  const setEventList = async ({token}) => {
   
    const AuthStr = 'Bearer '.concat(token);
    const url = `event`
    publicAxios.get(url, { headers: { Authorization: AuthStr } })
     .then(response => {
         // If request is good...
      let events = []
      let eventList =  (response.data).map((event) => (
        {
          id: event.publicId,
          name: event.name,
          date: event.dates[0],
        })
      )

      
      eventList.forEach((event) => events.push(JSON.stringify(event)))
      eventList.forEach((event) => {
         setEventGuestList({token: token, eventID: event.id, event: event});
      })

      
      })
     .catch((error) => {
         console.log('error ' + error);
      });
 
  }

  const setEventGuestList = async ({token, eventID, event}) => {
   
    const url = `event/${eventID}/guest`
    const AuthStr = 'Bearer '.concat(token); 
    publicAxios.get(url, { headers: { Authorization: AuthStr } })
     .then(response => {
         // If request is good...
        event.guest = []
        let guestList =  (response.data).map((guest) => guest.profile)
        guestList.forEach((guest) =>event.guest.push(guest))
        eventState.push(event)
        setEvents(eventState)
      })
     .catch((error) => {
         console.log('error ' + error);
      });   
  } 


  return (
    <View style={styles.wrapper}>

      <View style={styles.secureText1}>
        <Text style={{fontSize:45, fontWeight: 'bold', color: "white"}}>Numéro de téléphone</Text>
        <Text  style={{ color: "white"}}>Sur ZEEVEN, pas d'arnaque : 
              nous nous assurons de l'accès aux evènements a nos
              invités.
         </Text>         
      </View>

      <View style={styles.inputWrapper}>
        <PhoneInput 
          type="text" 
          style={{with: '100%', borderRadius: 20}} 
          defaultCode="FR"
          placeholder='749480254'
          onChangeText={(phoneNumber) => {
              setphoneNumber(phoneNumber);
          }}
          />
        <Button 
          style={styles.button} 
       ///   onPress={() => buttonPress()}

          onPress = {() =>{
            sendSMS(phoneNumber)
          }}
        
          title="Envoyer" 
        />
         
      </View>

        <Text style={TEXT_WHITE}>
              Ne t'en fais pas,  cette info n'apparaitra pas sur ton profile
              et ne sera partagée avec personne.
        </Text>
    </View>
  );
};

const styles = StyleSheet.create({
 
  inputWrapper: {
    flexDirection: 'column'
  },
  phoneContainer: {
    height: 55,
    borderRadius: 10,
  },
  button: {
    marginTop: 10,
    padding: 100,
    textAlign: 'center',
  },
  
  secureText1 : {
    fontSize:45, 
    fontWeight: 'bold'
  },

 
  wrapper:{
    flex:1,
    justifyContent: 'space-between',
    paddingLeft: 30,
    paddingRight:30,
    paddingTop: 40,
    paddingBottom: 40,
    backgroundColor: COLOR_BLUE,
    color: COLOR_WHITE
  }

});

export {CodeValidationScreen};