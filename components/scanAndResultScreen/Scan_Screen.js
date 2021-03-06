import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useFocusEffect } from '@react-navigation/native';

function Scan_Screen({navigation}) {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('NO QR CODE FOUND');
  const [idScan, setIdScan] = useState(1)

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == 'granted')
    })()
  }

 

   //Temporary QR-CODE Validation Functionality      

  const checkValidQR = () => {   
    try {
      const validID = [ 1, 2, 3, 4]
      let valid = (validID.includes(idScan))

      if(valid){
        setScanned(false)
        navigation.navigate("Scan_Valid", {})
      }else{
        navigation.navigate("Scan_Non_Valid")
      }

      
    } catch (error) {
      console.error("Erreur: " + error);
    }       
  }

  //Request for camera permission 
  useEffect(() => {
    askForCameraPermission();
  }, []);

  useFocusEffect(()=>{
    navigation.navigate('Home', {
      screen: 'Scanner',
      initial: true,
    });
    
  });


  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);

    alert(`Data ${data} has been scanned!`);
    //var formatJson0 = JSON.parse(data)   
   // console.log(formatJson0)  
    formatJSon(data);
    checkValidQR();  
  };


  const formatJSon = (qr_scan) =>{
    var qr_json;
    try {
      qr_json =  JSON.parse(qr_scan)
      console.log("id est: " + qr_json.id)
     
      console.log("Id Scan: "+  idScan)
    }catch(error){
      console.log("Erreur " + error)
    }
  }

  //Check permission and return the screens 
  if(hasPermission === null){
    return (
      <View style={styles.container}>
        <Text>Demande permision a la camera</Text>
      </View>
    )
  }else if (hasPermission === false){
    return (
      <View style={styles.container}>
        <Text style={{margin: 10}}>No acces to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()}/>
      </View>
    )
  }

  return (
    <View style={styles.container}>     
      <View style={styles.barcodebox}>
        <BarCodeScanner 
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{height: 770, width: 600}}
        />
      </View>
     
      {scanned && (
          <Button title={'Scan again'} 
                  onPress={() => setScanned(false)}
          />)
      }
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
  }
});

export default Scan_Screen