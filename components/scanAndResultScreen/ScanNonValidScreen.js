import React from 'react'
import { View, Text, Image } from 'react-native';


function ScanNonValidScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#fff"}}>
        <Image source={require("../../assets/redCrossSign.png")} ></Image>

    </View>
  )
}

export  {ScanNonValidScreen}