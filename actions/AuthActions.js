
export const signIn = (data) => async(dispatch) => {
    dispatch({ type: 'SIGN_IN', token: data  });     
}

export const signOut = () => async(dispatch) => {
    dispatch({ type: 'SIGN_OUT' })
}

export const signUp = (data) => async (dispatch) => {
    dispatch({ type: 'SIGN_OUT', token: data  })
}