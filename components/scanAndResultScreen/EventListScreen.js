import React, {useContext} from 'react'
import {Text, View,  StyleSheet} from 'react-native';

import { ApplicationContext } from '../../context/ApplicationContextProvider';
import { Event } from './Event'


function EventListScreen() {

  const { state } = useContext(ApplicationContext);
  const { eventList } = state;
  
  return ( 
   <View>
      {       
        !eventList ? 
            <Text>EMPTY</Text> :
        eventList.map((event)=> {
          return(
            <Event key={event.id} event={event}/>
          )
        })
      }
      
   </View>
  )
}

const styles = StyleSheet.create({
  container: {
   paddingTop:20,
   
   backgroundColor: "#004aab"
  },
})

export  {EventListScreen}
