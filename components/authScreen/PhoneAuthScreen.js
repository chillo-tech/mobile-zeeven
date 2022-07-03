import React, {useState, useRef, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import Ionicons from 'react-native-vector-icons/Ionicons';


import { SecurityContext } from '../../context/SecurityContextProvider';
import { ApplicationContext } from '../../context/ApplicationContextProvider';

const PhoneAuthScreen = () => {
  const [phoneNumber, setphoneNumber] = useState('');
  const phoneInput = useRef(null);
  var eventState =[]
  
  const { publicAxios } = useContext(SecurityContext);
  const { signIn,  setEvents } = useContext(ApplicationContext);


  useEffect(() => {
     
   
   }, [setEvents]);

  const buttonPress = async() => {

    try {
      const {data} = await publicAxios.post(
          "connexion", {
            username: "admin@admin.com",
            password: "events"
          }
      )

    setEventList(data)
    signIn(data)
       
    } catch (error) {
      console.log(JSON.stringify(error, null, 2)) 
    }
  };


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

  const setEventList = async ({token}) => {
    const AuthStr = 'Bearer '.concat(token);
    const url = `event`
    publicAxios.get(url, { headers: { Authorization: AuthStr } })
     .then(response => {
         // If request is good...
      let events = []
      let eventList =  (response.data).map((event) => (
        {
          id: event.id,
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


  return (
    <>  
      <View style={styles.secureText1}>
        <Text style={{fontSize:45, fontWeight: 'bold', color: "white"}}>Numéro de téléphone</Text>          
      </View>

      <View style={styles.container}>
        <PhoneInput
          ref={phoneInput}
          defaultValue={phoneNumber}
          defaultCode="FR"
          layout="first"
          withShadow
          autoFocus
          containerStyle={styles.phoneContainer}
          textContainerStyle={styles.textInput}
          onChangeFormattedText={text => {
            setphoneNumber(text);
          }}
        />
        <Pressable style={styles.button} onPress={() => buttonPress()}>
          <Text style={styles.continueText}>Envoyer</Text>
        </Pressable>
      </View>

      <View style={styles.secureText2}>
        <Ionicons name="lock-closed"  size={22} />
        <Text style={{ color: "white"}}>
              Ne t'en fais pas,  cette info n'apparaitra pas sur ton profile
              et ne sera partagée avec personne.
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#004aab',
  },

  phoneContainer: {
    width: '77%',
    height: 55,
    borderRadius: 20,
     paddingLeft:10

  },
  button: {
    marginTop: 30,
    width: '75%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  
  textInput: {
    paddingVertical: 0,
    borderRadius:20, 
  },

  secureText1 : {
    backgroundColor: '#004aab',
    fontSize:45, 
    fontWeight: 'bold', 
    color: "white",
    paddingLeft:30,
    paddingRight:50
  },

  secureText2 : {
    flexDirection: 'row',
    backgroundColor: '#004aab',
    paddingBottom:70,
    paddingLeft:35,
    paddingRight:55,
    color: "white",

  }

});

export {PhoneAuthScreen};