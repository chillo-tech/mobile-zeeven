import { RESTORE_TOKEN , SIGN_IN, SIGN_OUT, ADD_EVENTS} from '../../utils/actions/userActions'
const userAuthReducer = (prevState = { } , action) => {
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
        return {
          ...prevState,
          isSignout: true,
          userToken: null,
        };
      case ADD_EVENTS:
        return{
          ...prevState,
          eventList : action.eventList
      };
      case 'ACTUAL_EVENT':
        return{
          ...prevState,
          eventActual : action.eventActual,
          eventGuests : action.eventGuests,
      };
      

      default: 
        return { };
    }
}

export  {userAuthReducer};