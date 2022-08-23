import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  Linking,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

function GuestProfile({ route }) {
  const { guest } = route.params;

  const mailToGuest = () => {
    console.log("Mail to");
    Linking.openURL(`mailto:${guest.email}`);
  };

  const callToGuest = () => {
    Linking.openURL(`tel:${guest.phone}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image
              source={require("../../images/cat.png")}
              style={styles.image}
              resizeMode="center"
            />
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.text, { fontWeight: "200", fontSize: 30 }]}>
            {guest.firstName}
          </Text>
          <Text style={[styles.text, { color: "#AEB5BC", fontSize: 24 }]}>
            {guest.lastName}
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Ionicons name="phone-portrait-outline" size={40} />
          <Text
            onPress={() => {
              callToGuest();
            }}
          >
            {guest.phone}{" "}
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Ionicons name="mail-outline" size={40} />
          <Text
            onPress={() => {
              mailToGuest();
            }}
          >
            {guest.email}{" "}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  text: {
    color: "#52575D",
  },

  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },

  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16,
  },

  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
  },

  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16,
  },
});

export { GuestProfile };
