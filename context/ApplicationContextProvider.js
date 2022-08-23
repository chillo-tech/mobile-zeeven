import React, { createContext, useReducer, useMemo } from "react";
import { RESTORE_TOKEN, SIGN_IN, SIGN_OUT } from "../utils/actions/userActions";
import {
  ADD_EVENTS,
  ACTUAL_EVENT,
  UPDATE_EVENT,
  REMOVE_ACTUAL_EVENT,
  CHECKIN_GUEST,
} from "../utils/actions/eventActions";
import { userAuthReducer } from "./reducers/userAuthReducer";

export const ApplicationContext = createContext(null);

function ApplicationContextProvider({ children }) {
  const [state, dispatch] = useReducer(userAuthReducer, {});

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        dispatch({
          type: SIGN_IN,
          token: data,
        });
      },

      signOut: () => {
        dispatch({ type: SIGN_OUT });
      },

      //Events Handlers
      setEvents: (data) => {
        dispatch({
          type: ADD_EVENTS,
          eventList: data,
        });
      },

      chooseEvent: (data) => {
        //On reininitialise le checkInList
        if (state.eventActual != data) {
          state.checkInGuests = [];
        }

        dispatch({
          type: ACTUAL_EVENT,
          eventActual: data,
          eventGuests: data.guest,
        });
      },

      eventUpdate: (data) => {
        dispatch({
          type: UPDATE_EVENT,
          eventGuests: data,
        });
      },

      removeActualEvent: () => {
        dispatch({ type: REMOVE_ACTUAL_EVENT });
      },

      checkIn: (data) => {
        dispatch({
          type: CHECKIN_GUEST,
          checkInGuests: data,
        });
      },
    }),
    [state]
  );

  return (
    <ApplicationContext.Provider value={{ state, ...authContext }}>
      {children}
    </ApplicationContext.Provider>
  );
}

export default ApplicationContextProvider;
