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
/*
faker.seed(10);

const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.random.uuid(),
    image: ``,
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  };
});

const BG_IMG = `https://images.pexels.com/photos/1231265/pexels-photo-1231265.jpeg?`


*/
const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d7a',
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b',
    title: 'fourth Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f6',
    title: 'fifth Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d7',
    title: 'seven Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb',
    title: 'eight Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fb',
    title: 'ninth Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571',
    title: 'tentnrh Item',
  },
];

function Check_in_Screen({ navigation ,route}) {

  const [guestList, setGuestList] = useState([])
  var { guest } = route.params;


 
 

  useEffect(() => {
    setGuestList(oldGuest => [...oldGuest, guest])
  }, []);


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
                  <Text>{item.name}</Text>
                  <Text>{item.email}</Text>
                  <Text>{item.telephone}</Text>
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

export default Check_in_Screen;