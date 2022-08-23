import React, { useContext } from 'react'
import {StyleSheet, View, Text, Pressable, Alert} from 'react-native'

import { ApplicationContext } from '../../context/ApplicationContextProvider';
import { formatDate } from '../../services/utils/date-format';
import { COLOR_BLUE, DEFAULT_PADDING } from '../../utils/constants';

function Event({navigation, event}) {

  const { chooseEvent  } = useContext(ApplicationContext);
  const displayEvent= (event) =>{
    chooseEvent(event)
    navigation.navigate('Home')
  }


  return (
    <View style={styles.container}>
        <Pressable onPress={() => displayEvent(event)}>
            <Text style={styles.eventName}>{event.name}</Text> 
            <Text>{formatDate(event.date)}</Text> 
        </Pressable>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
   padding: DEFAULT_PADDING,
   marginBottom:20,
   borderRadius: 10,
   backgroundColor: '#F5FEFD',
   borderBottomWidth: 5,
   borderColor: COLOR_BLUE
  },

  eventName:{
    fontSize: 15,
    fontWeight : 'bold',
    marginBottom: 8
  }
});
export {Event}
