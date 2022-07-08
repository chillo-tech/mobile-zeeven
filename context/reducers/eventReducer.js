import { ADD_EVENTS, ACTUAL_EVENT, CHECKIN_GUESTS } from '../../utils/actions/eventActions'

const eventReducer = (prevState = { } , action) => {
    switch (action.type) {
      case ADD_EVENTS:
        return {
          ...prevState,
          eventList : action.eventList
        };
      case ACTUAL_EVENT:
        return {
          ...prevState,
          eventActual : action.eventActual,
          eventGuests : action.eventGuests,
      };
      case CHECKIN_GUESTS:
        return {
          ...prevState,
          checkInGuests : action.checkInGuests
      };
      default: 
        return {
      //autoRemove
        }
    }
}
export {eventReducer}