import React, { useState, useContext } from "react";
import { View, Button, TextInput, StyleSheet } from "react-native";

import { ApplicationContext } from "../../context/ApplicationContextProvider";
import { SecurityContext } from "../../context/SecurityContextProvider";
import { COLOR_BLUE } from "../../utils/constants";

function SecretCodeScreen({ route, navigation }) {
  const [code, setCode] = useState("");
  const { publicAxios } = useContext(SecurityContext);
  const { signIn, setEvents } = useContext(ApplicationContext);

  const { phone, phoneIndex } = route.params;

  var eventState = [];

  const sendCode = async (codeUser) => {
    try {
      const { data } = await publicAxios.post("/activate-phone", {
        phoneIndex: phoneIndex,
        phone: phone,
        token: codeUser,
      });

      setEventList(data);
      signIn(data);
    } catch (error) {
      navigation.navigate("New User", {
        phoneIndex: "+33",
        phone: phone,
      });

      // console.log(JSON.stringify(error, null, 2));
    }
  };

  const setEventList = async ({ accessToken }) => {
    const AuthStr = "Bearer ".concat(accessToken);
    const url = `event`;
    publicAxios
      .get(url, { headers: { Authorization: AuthStr } })
      .then((response) => {
        // If request is good...

        let events = [];
        let eventList = response.data.map((event) => ({
          id: event.publicId,
          name: event.name,
          date: event.dates[0],
        }));

        eventList.forEach((event) => events.push(JSON.stringify(event)));
        eventList.forEach((event) => {
          setEventGuestList({
            token: accessToken,
            eventID: event.id,
            event: event,
          });
        });
      })
      .catch((error) => {
        console.log("error " + error);
      });
  };

  const setEventGuestList = async ({ token, eventID, event }) => {
    const url = `event/${eventID}/guest`;
    const AuthStr = "Bearer ".concat(token);
    publicAxios
      .get(url, { headers: { Authorization: AuthStr } })
      .then((response) => {
        // If request is good...
        event.guest = [];
        let guestList = response.data.map((guest) => guest.profile);
        guestList.forEach((guest) => event.guest.push(guest));
        eventState.push(event);
        setEvents(eventState);
      })
      .catch((error) => {
        console.log("error " + error);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={setCode}
        value={code}
        placeholder="Code Secret"
        keyboardType="numeric"
        style={styles.input}
      />

      <Button
        title="Envoyer Code"
        onPress={() => {
          sendCode(code);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 10,
    padding: 40,
  },

  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderColor: COLOR_BLUE,
  },
});

export { SecretCodeScreen };
