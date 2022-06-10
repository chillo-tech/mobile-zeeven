import React, { useState, useContext } from 'react'
import {View, Button ,TextInput, StyleSheet } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';

import AuthContext from '../../context'

export default function SecretCodeScreen({navigation}) {
  const [code, setCode] = useState('')
  const { signUp } = useContext(AuthContext);


  const sendCode = () =>{
    if(code != 1234){
      navigation.navigate("New User")
    }else{
      let userName = 'Kendy'
      let password = '123456'
      signUp({userName , password })
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={setCode}
        value={code}
        placeholder="Code Secret"
        keyboardType="numeric"
      />
      
      <Button 
        title='Envoyer Code'
        onPress={() => {sendCode()}}
      />
    </View>   
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  buttonContainer: {
    margin: 20
  },
  
});