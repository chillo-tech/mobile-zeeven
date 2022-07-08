import React, { useContext,useEffect, useState } from 'react'
import { View,  Text, 
FlatList, Image, StyleSheet,
StatusBar, Animated,
TextInput, TouchableHighlight
} from 'react-native'

import { DEFAULT_SCREEN_TEXT_VIEW, DEFAULT_SCREEN_VIEW  } from  '../../utils/constants'
import { ApplicationContext } from '../../context/ApplicationContextProvider'

function GuestList({navigation}) {
 const { state } = useContext(ApplicationContext)
 const guests = state.eventGuests
 const [guestList, setGuestList] = useState([])
 const [searchBar , setSearchBar] = useState("")
 


 useEffect(() => {
  if(guests){
    setGuestList(guests)
  }
 }, [state, searchBar == '']);



 const searchName = (nameSearch) =>{

  let searchData = guestList.filter((guest)=>  {
    return guest.lastName.toLowerCase().includes(nameSearch.toLowerCase())   || 
    guest.firstName.toLowerCase().includes(nameSearch.toLowerCase())   
  })
  setGuestList(searchData)
 }

 const showGuestInfo = (guest) =>{
  navigation.navigate("Guest_Profile", {guest})
}

 const BG_IMG =''
 const SPACING = 20
 const AVATAR_SIZE = 70

  return (
  guests ? 
    <View>
      <View style={styles.searchBar}>
        <TextInput
            placeholder='Search Guest'
            onChangeText={(input) =>{
              searchName(input)
              setSearchBar(input)
            }}
            value={searchBar} 
        />
      </View>
      <View style={{ backgroundColor: '#fff'}}>     
        <FlatList
            data={guestList}
            keyExtractor={guest => guest.id}
            contentContainerStyle={{
              padding: SPACING, 
              paddingTop: StatusBar.currentHeight || 42
            }}

            renderItem={({item, index}) =>{      
              return (
                <TouchableHighlight  onPress={() => showGuestInfo(item)}>
                  <View style={styles.guestContainer}>
                    <Image
                        source={require('../../images/imgJP.jpg')}
                        style={styles.imageContainer}
                    />
                    <View>
                      <Text style={{fontSize: 17, fontWeight: '700'}}>{item.firstName}</Text>
                      <Text style={{fontSize: 10, opacity: .7}}>{item.lastName}</Text>
                      <Text style={{fontSize: 13, opacity: .8, color: 'white'}}>{item.email}</Text>
                    </View>
                  </View>
                </TouchableHighlight>
              )
            }}
        />
      </View>
    </View> :
    <View style={DEFAULT_SCREEN_VIEW}>
      <Text style={DEFAULT_SCREEN_TEXT_VIEW}> Ce EVENT n'a aucun invitée </Text>
    </View>
   
  )
}


const styles = StyleSheet.create({
  

  searchBar:{
    
    width: '100%',
    height: 35,
    borderRadius: 25,
    backgroundColor: '#5074c3',
    paddingLeft:22
  },

  guestContainer: {
    flexDirection: 'row' , 
    padding: 20,
    marginBottom: 20, 
    backgroundColor: '#3374ff', 
    borderRadius: 16,
    shadowOffset: {
      width: 0,
      height: 10
    }, 
    shadowOpacity: 1,
    shadowRadius: 20
  },

  imageContainer:{
    width: 70, 
    height: 70, 
    borderRadius: 70,
    marginRight: 10
  }


 
});

export {GuestList}