import {
  RESTORE_TOKEN,
  SIGN_IN,
  SIGN_OUT,
} from "../../utils/actions/userActions";
import {
  ADD_EVENTS,
  ACTUAL_EVENT,
  CHECKIN_GUEST,
  UPDATE_EVENT,
} from "../../utils/actions/eventActions";

const userAuthReducer = (prevState = {}, action) => {
  switch (action.type) {
    case RESTORE_TOKEN:
      return {
        ...prevState,
        userToken: action.token,
      };
    case SIGN_IN:
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
      };
    case SIGN_OUT:
      return {};
    case ADD_EVENTS:
      return {
        ...prevState,
        eventList: action.eventList,
      };
    case ACTUAL_EVENT:
      return {
        ...prevState,
        eventActual: action.eventActual,
        eventGuests: action.eventGuests,
      };

    case UPDATE_EVENT:
      return {
        ...prevState,
        eventGuests: action.eventGuests,
      };
    case CHECKIN_GUEST:
      return {
        ...prevState,
        checkInGuests: action.checkInGuests,
      };

    default:
      return {};
  }
};

export { userAuthReducer };
