import React , { useState,  useContext } from 'react'
import { Button,  TextInput, StyleSheet, View } from 'react-native';
import { SecurityContext } from "../../context/SecurityContextProvider";


export  function NewUserScreen({ route, navigation }) {
  const { phone, phoneIndex } = route.params;
  const { publicAxios } = useContext(SecurityContext);


  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const addNewUser = async() => {

    setLastName(lastName.trim())
    setFirstName(firstName.trim())
    setEmail(email.trim().toLocaleLowerCase())
    setPassword(password.trim)


    try {
      const { data } = await publicAxios.post("/inscription", {
        firstName : firstName,
        lastName : lastName,
        email: email,
        password: password,
        phoneIndex: phoneIndex,
        phone: phone
      });

      navigation.navigate("Numero AUTH");
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
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
        onChangeText={setFirstName}
        value={firstName}
      />

      <TextInput  style={styles.container}
        placeholder='Entrer prénom'
        onChangeText={setLastName}
        value={lastName}
      />

      <TextInput  style={styles.container}
        placeholder='Entrer E-mail'
        onChangeText={setEmail}
        value={email}
      />

      <TextInput  style={styles.container}
        placeholder='Entrer un mot de passe'
        onChangeText={setPassword}
        value={password}
      />
      <Button title='submit' onPress={addNewUser}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 30,
    

  },
  
});