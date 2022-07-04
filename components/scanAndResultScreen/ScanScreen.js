import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Alert , Button, TouchableOpacity, Platform, Dimensions,    } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useIsFocused } from '@react-navigation/native';

import Torch from 'react-native-torch';
import {RNFlash} from 'react-native-flash';
import { useTorchLight } from '@blackbox-vision/use-torch-light';

import { ApplicationContext } from '../../context/ApplicationContextProvider';

function ScanScreen({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  //Torch
  const [isTorchOn, setIsTorchOn] = useState(false);

  const {state} = useContext(ApplicationContext)
  const { eventGuests, eventActual, checkInGuests } = state
  const {width , height} = Dimensions.get('window')

  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      setScanned(false);
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

   }, [state]);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    if(eventGuests){
         checkValidQR(formatJSon(data))  
    }else{
      console.log("Cet EVENT n'a pas d'invitee")
    }
  };

  const AlertAlreadyCheckIn = (guest) =>{
    Alert.alert(
      "Cet invité a deja Check IN",

      "Voir le Profil", 
      [
        {
          text: "YES", onPress: ()=>{
            navigation.navigate("Guest_Profile", {guest})
          }
        },
        {
          text: "NO", onPress: ()=>{
            console.log("click on NO")
          }
        }
        
      ]
      
    )
  } 


  const handleTorch = () => {
   
    
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  //Mes fonctions
  const formatJSon = (qr_scan) =>{
    var qr_json;
    try {
      qr_json =  JSON.parse(qr_scan)
      return qr_json
    }catch(error){
      console.log("Erreur " + error)
    }
  }

  const checkValidQR = (guest) => { 
    try {
      let valid = false;

      if(!checkValidEvent(guest)){ 
        alert("Vous avez choisi le mauvais EVENT")
      }else  if(!checkValidGuestID(guest)){
        alert("Vous avez choisi le mauvais GUEST")
      }else if(checkCheckIn(guest)){
        AlertAlreadyCheckIn(guest)

      } else{

          navigation.navigate("Scan_Valid", {guest})
      }

      /*
      if(valid){
      
      }else{
        navigation.navigate("Scan_Non_Valid")
      }     */ 
    } catch (error) {
      console.error("Erreur: " + error);
    }       
  }

  const checkValidEvent = (guest) =>{
    return eventActual.id == guest.event
  }

  const checkValidGuestID = (guest) =>{
    return eventGuests.some((validGuestId) => validGuestId.id  === guest.id)
  }

  const checkCheckIn = (guest) =>{
    if(checkInGuests){
          return checkInGuests.some((guestCheckIn) => guestCheckIn.id  === guest.id)
    }
    return false    
  }


  return (
    !eventActual ? (
      <View style={{  flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text> Veuillez Selectionner un EVENT</Text>
      </View>
    )
     :
    <View style={styles.container}>
      {isFocused ? (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{
            width: 700, height:800
          }}         
        />
      ) : null}
      {scanned && (
        <>
          <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
         </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  barcodebox: {
    alignItems: 'center',
    flex : 1,
    overflow: 'hidden', 
    borderRadius: 0,
    backgroundColor: 'white',
  }, 

  maintext: {
    fontSize: 16,
    margin: 20,
  }, 
  
});

export  {ScanScreen}