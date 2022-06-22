import React,  { createContext, useReducer, useMemo } from 'react'
import { userAuthReducer } from './reducers/userAuthReducer'

export const ApplicationContext = createContext(null);

function ApplicationContextProvider({children}) {
    const [state, dispatch] = useReducer(userAuthReducer, { } );

    const authContext = useMemo(
        () => ({ 
          signIn: async (data) => { dispatch({ type: 'SIGN_IN', token: data  }); },
          signOut: () =>          { dispatch({ type: 'SIGN_OUT' })},
          signUp: async (data) => { dispatch({ type: 'SIGN_IN', token: data  })},
    
          signUpWithPoneNumber: async (phoneNumber) => {
            dispatch({ type: 'SIGN_IN', token: phoneNumber  });
          }, 
    
          signInNewUser: async (data) => {
            dispatch({ type: 'SIGN_IN_NEW_USER', token: data  });
          },

          setGuestList: (data) => {
            dispatch({ type: 'GUEST_LIST', guestList: data  });
          }
        
        }),[state]
      );

    return (
      <ApplicationContext.Provider value={{state, ...authContext}}>
        {children}
      </ApplicationContext.Provider>
  	);
}


export default ApplicationContextProvider;
