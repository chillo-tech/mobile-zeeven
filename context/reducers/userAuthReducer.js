import { RESTORE_TOKEN , SIGN_IN, SIGN_OUT, ADD_GUEST_LIST} from '../../utils/actions/userActions'
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
      case ADD_GUEST_LIST:
        return{
          ...prevState,
        eventGuests: action.guestList
      };
      case 'ADD_GUEST':
        return{
          ...prevState,
          numberCheckIn: action.numberCheckIn
      };
      default: 
        return { };
    }
}

export  {userAuthReducer};