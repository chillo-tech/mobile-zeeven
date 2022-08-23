import React, { useContext } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";

import { ApplicationContext } from "../../context/ApplicationContextProvider";
import { DEFAULT_SCREEN_TEXT_VIEW, DEFAULT_SCREEN_VIEW } from "../../utils/constants";
import { Event } from "./Event";

function EventListScreen({ navigation }) {
  const { state } = useContext(ApplicationContext);
  const { eventList } = state;

  return (
    <View style={styles.container}>
      {eventList ? (
        <>
          <Text style={styles.title}>Liste d'evenements</Text>
          <FlatList
            contentContainerStyle={styles.list}
            data={eventList}
            keyExtractor={(event) => event.id}
            renderItem={({ item, index }) => (
              <Event key={item.id} event={item} navigation={navigation} />
            )}
          />
        </>
      ) : (
         <View style={DEFAULT_SCREEN_VIEW}>
         <Text style={DEFAULT_SCREEN_TEXT_VIEW}> Il n'y a aucun Evènement </Text>
       </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },

  title: {
    fontWeight: "bold",
    fontSize: 35,
  },

  list: {
    flex: 1,
    marginTop: 30,
  },
});

export { EventListScreen };
