import React, {useState, useRef, useContext} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';


import { SecurityContext } from '../../context/SecurityContextProvider';
import { ApplicationContext } from '../../context/ApplicationContextProvider';

const PhoneAuthScreen = () => {
  const [phoneNumber, setphoneNumber] = useState('');
  const phoneInput = useRef(null);
  
  const { publicAxios } = useContext(SecurityContext);
  const { signIn, setGuestList } = useContext(ApplicationContext);


  const buttonPress = async() => {

    try {
      const {data} = await publicAxios.post(
          "connexion", {
            username: "admin@admin.com",
            password: "events"
          }
      )

      addGuestList(data)
      signIn(data)
       
    } catch (error) {
      console.log(JSON.stringify(error, null, 2))
      
    }
  };


  const addGuestList = async ({token}) => {
    const eventId = '62aa0458f63d912f5040a2ea'
    const url = `event/${eventId}/guest`
    const AuthStr = 'Bearer '.concat(token); 
    publicAxios.get(url, { headers: { Authorization: AuthStr } })
     .then(response => {
         // If request is good...

         let guestSave = []
         let guestList =  (response.data).map((guest) => guest.profile)
         guestList.forEach((guest) => guestSave.push(JSON.stringify(guest)))
         setGuestList(guestSave)
      })
     .catch((error) => {
         console.log('error ' + error);
      });
  }


  return (
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  phoneContainer: {
    width: '75%',
    height: 55,
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
  },
});

export {PhoneAuthScreen};