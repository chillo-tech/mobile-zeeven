import React, { useContext,useEffect, useState } from 'react'
import { View,  Text, 
FlatList, Image, StyleSheet,
StatusBar, Animated,
TextInput

} from 'react-native'
import { ApplicationContext } from '../../context/ApplicationContextProvider'

function GuestList() {
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

 const searchEmpty = () => {
  return (
    <View style={{  flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text>Cette personne n'est pas invitée</Text>
    </View>
  )
 }

 const BG_IMG =''
 const SPACING = 20
 const AVATAR_SIZE = 70

  return (
  guests ? 
  <><View style={styles.searchBar}>
        <TextInput
            placeholder='Search Guest'
            onChangeText={(input) =>{
              searchName(input)
              setSearchBar(input)
            }}
            value={searchBar} 
            
        />
      </View>
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      
      <FlatList
          data={guestList}
          keyExtractor={guest => guest.id}
          contentContainerStyle={{
            padding: SPACING, 
            paddingTop: StatusBar.currentHeight || 42
          }}

          renderItem={({item, index}) =>{
           
            return (
              
              <View style={{
                  flexDirection: 'row' , 
                  padding: SPACING,
                  marginBottom: SPACING, 
                  backgroundColor: '#004abb', 
                  borderRadius: 16,
                  shadowColor: 'green',
                  shadowOffset: {
                    width: 0,
                    height: 10
                  }, 
                  shadowOpacity: 1,
                  shadowRadius: 20
                  }}>
                <Image
                    source={require('../../images/imgJP.jpg')}
                    style={{
                      width: AVATAR_SIZE, 
                      height: AVATAR_SIZE, 
                      borderRadius: AVATAR_SIZE,
                      marginRight: SPACING / 2
                    }}
                />
                <View>
                  <Text style={{fontSize: 17, fontWeight: '700'}}>{item.firstName}</Text>
                  <Text style={{fontSize: 10, opacity: .7}}>{item.lastName}</Text>
                  <Text style={{fontSize: 13, opacity: .8, color: 'white'}}>{item.email}</Text>
                </View>
              </View>
            )
          }}
      
      />
    </View>
    </>
     
     :
  <View >
    <Text> Aucun invites </Text>
  </View>
   
  )
}


const styles = StyleSheet.create({
 
  searchBar:{
    width: '85%',
    height: 35,
    borderRadius: 25,
    backgroundColor: 'gray',
    

  }
 
});

export {GuestList}