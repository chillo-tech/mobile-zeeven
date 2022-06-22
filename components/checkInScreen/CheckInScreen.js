import React, { useState ,useEffect } from 'react'
import { 
  View,
  Dimensions,
  StyleSheet, 
  FlatList,
  Text,
  TouchableOpacity, 
  Easing,
  SafeAreaViewBase,
  SafeAreaView, 
  Image
} from 'react-native';


const { width, height } = Dimensions.get('screen');
const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;


function CheckInScreen({ navigation ,route }) {

  const [guestList, setGuestList] = useState([])
  var { guest } = route.params ? route.params : {guest : {id: -1}};


  if(guest.id == null){
    <Text>LIST empty</Text>
  }
    

  useEffect(() => {
    if(guest.id == -1){
      
    }else if(!alreadyCheckIn(guest)){
      setGuestList(oldGuest => [...oldGuest, guest])
      console.log(guestList)

    }else{
      alert(`Cet invite a deja ete Check IN`);
    }
    
  }, [guest]);


  const alreadyCheckIn = (guest) => {
      let guestId = guest.id;
      return guestList.some(item => item.id === guestId)
  }

return (
    <View style={{ flex: 1, backgroundColor: '#fff'}}> 
      <FlatList
        data={guestList}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => {
          return (
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
            
          )
        }}
      />
       
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 20,
    height: 55,
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },
});

export  {CheckInScreen};