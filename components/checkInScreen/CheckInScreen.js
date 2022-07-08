import React, { useState ,useEffect, useContext } from 'react'
import { 
  View, Dimensions, StyleSheet, 
  FlatList, Text,Image,
  TouchableHighlight,  TouchableOpacity, 
  Easing,
  SafeAreaViewBase,
  SafeAreaView, 
  
} from 'react-native';

import { DEFAULT_SCREEN_TEXT_VIEW, DEFAULT_SCREEN_VIEW  } from  '../../utils/constants'

import { ApplicationContext } from '../../context/ApplicationContextProvider'

const { width, height } = Dimensions.get('screen');
const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;


function CheckInScreen({ navigation ,route }) {

  const { checkIn, checkInGuests } = useContext(ApplicationContext);

  const [checkInList, setCheckInList] = useState([])
  var { guest } = route.params ? route.params : {guest : {id: -1}};


  if(guest.id == null){
    <Text>LIST empty</Text>
  }
    
 
  useEffect(() => {
    if(guest.id == -1){
      
    }else if(!alreadyCheckIn(guest)){
      setCheckInList(checkInList => [...checkInList, guest])
      checkIn([...checkInList, guest])
 
    }else{
      alert(`Cet invite a deja ete Check IN`);
    }

  }, [guest]);


  const alreadyCheckIn = (guest) => {
      let guestId = guest.id;
      return checkInList.some(item => item.id === guestId)
  }

  const showGuestInfo = (guest) =>{
    navigation.navigate("Guest_Profile", {guest})
  }
 
  return (
  
    (checkInList.length !== 0) ? (
      <View style={{ flex: 1, backgroundColor: '#fff'}}> 
        <FlatList
          data={checkInList}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            return (
              <TouchableHighlight onPress={() => showGuestInfo(item)}>
              <View style={{flexDirection: 'row'}}>
                  <Image 
                    source={require('../../images/imgJP.jpg')}
                    style={{width: AVATAR_SIZE, 
                            height: AVATAR_SIZE, 
                            borderRadius: AVATAR_SIZE, marginRight : SPACING /2}}
                  />
                  <View>
                      <Text>{item.firstName}</Text>
                      <Text>{item.email}</Text>
                      <Text>{item.phone}</Text>
                  </View>
              </View>
              </TouchableHighlight>
            )
          }}
        />      
      </View>
      ): (
        <View style={DEFAULT_SCREEN_VIEW}>
          <Text  style={DEFAULT_SCREEN_TEXT_VIEW} >Aucun Invité est arrivée</Text>
        </View>
      ) 
    )
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },

  defaultView: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center"
  },

  defaultText:{
    fontWeight: "bold", 
    fontSize:25
  },
});

export  {CheckInScreen};