import { RESTORE_TOKEN , SIGN_IN, SIGN_OUT} from '../../utils/actions/userActions'
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
      case 'GUEST_LIST':
        return{
          ...prevState,
        eventGuests: action.guestList
      };
      default: 
        return { };
    }
}

export  {userAuthReducer};