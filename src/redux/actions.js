export const loginUser = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: userData,
        });
    } catch (error) {
        dispatch({
            type: 'LOGIN_FAILURE',
            payload: error,
        });
    }
};
