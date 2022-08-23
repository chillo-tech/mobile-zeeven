import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from "react-native";

import {
  COLOR_BLUE,
  DEFAULT_PADDING,
  DEFAULT_SCREEN_TEXT_VIEW,
  DEFAULT_SCREEN_VIEW,
} from "../../utils/constants";
import { ApplicationContext } from "../../context/ApplicationContextProvider";

function GuestList({ navigation }) {
  const { state } = useContext(ApplicationContext);
  const guests = state.eventGuests;
  const [guestList, setGuestList] = useState([]);
  const [searchBar, setSearchBar] = useState("");

  useEffect(() => {
    if (guests) {
      setGuestList(guests);
    }
  }, [state, searchBar == ""]);

  const searchName = (nameSearch) => {
    let searchData = guestList.filter((guest) => {
      return (
        guest.lastName.toLowerCase().includes(nameSearch.toLowerCase()) ||
        guest.firstName.toLowerCase().includes(nameSearch.toLowerCase())
      );
    });
    setGuestList(searchData);
  };

  const showGuestInfo = (guest) => {
    navigation.navigate("Guest_Profile", { guest });
  };

  return guests ? (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Recherche invité"
          onChangeText={(input) => {
            searchName(input);
            setSearchBar(input);
          }}
          value={searchBar}
        />
      </View>
      <View>
        <FlatList
          data={guestList}
          keyExtractor={(guest) => guest.id}
          renderItem={({ item, index }) => {
            return (
              <TouchableHighlight onPress={() => showGuestInfo(item)}>
                <View style={styles.guestContainer}>
                  <Image
                    source={require("../../images/imgJP.jpg")}
                    style={styles.imageContainer}
                  />
                  <View>
                    <Text style={{ fontSize: 17, fontWeight: "700" }}>
                      {item.firstName}
                    </Text>
                    <Text style={{ fontSize: 10, opacity: 0.7 }}>
                      {item.lastName}
                    </Text>
                    <Text style={{ fontSize: 13, opacity: 0.8 }}>
                      {item.email}
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
            );
          }}
        />
      </View>
    </View>
  ) : (
    <View style={DEFAULT_SCREEN_VIEW}>
      <Text style={DEFAULT_SCREEN_TEXT_VIEW}> Ce EVENT n'a aucun invitée </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 10,
  },

  searchBar: {
    height: 35,
    borderRadius: 10,
    backgroundColor: "#F5FEFD",
    marginBottom: 20,
  },

  list: {
    padding: 10,
    paddingTop: 10,
  },

  guestContainer: {
    flexDirection: "row",
    padding: DEFAULT_PADDING,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#F5FEFD",
    borderBottomWidth: 5,
    borderColor: COLOR_BLUE,
  },

  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 70,
    marginRight: 10,
  },

  list: {
    flex: 1,
    marginTop: 30,
  },
});

export { GuestList };
