import React , { useState,  useContext } from 'react'
import { Button,  TextInput, StyleSheet, View } from 'react-native';
import AuthContext from '../../context';

export default function NewUserScreen() {

  const { signIn } = useContext(AuthContext);

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')


  const submit = () => {

    if (validateEmail(email)) {
      console.log('New User Valid')
      signIn({name, email})
      console.log("SIGN IN NEW USER")
    } else {
      // not a valid email
      console.log('New User NOT VALID')

    }
  }

  const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  };

  return (
    <View style={styles.container}>
      <TextInput  style={styles.container}
        placeholder='Entrer nom'
        onChangeText={setName}
        value={name}
      />

      <TextInput  style={styles.container}
        placeholder='Entrer E-mail'
        onChangeText={setEmail}
        value={email}
      />
      <Button title='submit' onPress={submit}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 30,
    marginTop:100,
    

  },
  textInput: {
    borderWidth: 2,
    borderColor: 'blue',
    flex:1
    
  },
  
});