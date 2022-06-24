import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useIsFocused } from '@react-navigation/native';


import { ApplicationContext } from '../../context/ApplicationContextProvider';

function ScanScreen({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const {state} = useContext(ApplicationContext);
  const { eventGuests } = state
  

  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      setScanned(false);
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      
    })();
  }, [state]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    if(eventGuests){
          checkValidQR(formatJSon(data).id)  
    }
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

  const checkValidQR = (guestId) => {   
    try {
      let valid = eventGuests.some((validGuestId) => JSON.parse(validGuestId).id  === guestId)
      console.log(valid + " " + guestId )

      if(valid){
        navigation.navigate("Scan_Valid", {guestId})
      }else{
        navigation.navigate("Scan_Non_Valid")
      }      
    } catch (error) {
      console.error("Erreur: " + error);
    }       
  }


  
  return (
    <View style={styles.container}>
      {isFocused ? (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
          
        />
      ) : null}
      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
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