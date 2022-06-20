export const guestReducer = (prevState, action) => {
    switch (action.type) {
      case 'Guest_Check_IN':
        return {
          
        };
      default: 
        return {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    }
}