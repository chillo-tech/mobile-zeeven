import React, {useState, useRef, useContext} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import  AuthContext  from '../../context';


const PhoneAuthScreen = ({navigation}) => {
  const [phoneNumber, setphoneNumber] = useState('');
  const phoneInput = useRef(null);
  
const { signUpWithPoneNumber } = useContext(AuthContext);


const buttonPress = () => {
   navigation.navigate("Secret Code")
};


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

export default PhoneAuthScreen;