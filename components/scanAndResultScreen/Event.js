import React, { useContext} from 'react'
import {StyleSheet, View, Text, Pressable } from 'react-native'

import { ApplicationContext } from '../../context/ApplicationContextProvider';

function Event({event}) {

    const { chooseEvent  } = useContext(ApplicationContext);
    
    const eventChoose= (event) =>{
      chooseEvent(event)
    }

    const setDate = (eventDate) => {
        let date = new Date(eventDate)
        date = date.toLocaleString('fr-FR', {day:'numeric', month: 'long', year:'numeric'})
        return date;
    }


    const date = setDate(event.date)
    

  return (
    <View style={styles.container}>
        <Pressable onPress={() => eventChoose(event)}>
            <Text>{event.name}</Text> 
            <Text>{date}</Text> 
        </Pressable>
    </View>
  )
}



const styles = StyleSheet.create({
    container: {
     paddingBottom:10,
     margin:20,

     borderRadius: 10,
     paddingLeft: 80,
     
     backgroundColor: "#004aab"
    },

  });
  

export  {Event}
