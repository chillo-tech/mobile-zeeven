import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { ApplicationContext } from './ApplicationContextProvider';
import { eventReducer } from './reducers/eventReducer'
import { ADD_EVENTS, ACTUAL_EVENT, CHECKIN_GUESTS } from '../utils/actions/eventActions'

export const EventContext = createContext(null);


function EventContextProvider({children}){
    const { state } = useContext(ApplicationContext);
    const [stateEvent, dispatch] = useReducer(eventReducer, { state } );

    const eventContext = useMemo(
        () => ({ 

          //Events Handlers       
          setEvents: (data) => {
            dispatch({ type: ADD_EVENTS, eventList: data });
          },

          chooseEvent: (data) => {
            //On reininitialise le checkInList
            if(state.eventActual != data){
              state.checkInGuests = new Array()
            }
           dispatch({ type: ACTUAL_EVENT, eventActual: data,  eventGuests: data.guest, });
          },

          checkIn: (data) => { 
            dispatch({ type: CHECKIN_GUESTS, checkInGuests: data  });
          },
        }),[state]
      );

    return (
      <EventContext.Provider value={{stateEvent, ...eventContext}}>
        {children}
      </EventContext.Provider>
  	);

}


export default EventContextProvider;