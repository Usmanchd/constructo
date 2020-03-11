const initState = {
  authError: null,
  loading: false
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_ERROR':
      console.log('login error');
      return {
        ...state,
        authError: 'Login failed'
      };

    case 'LOGIN_SUCCESS':
      console.log('login success');
      return {
        ...state,
        authError: null
      };

    case 'SIGNOUT_SUCCESS':
      console.log('signout success');
      return state;

    case 'SIGNUP_SUCCESS':
      console.log('signup success');
      return {
        ...state,
        authError: null
      };

    case 'SIGNUP_ERROR':
      return {
        ...state,
        authError: action.err.message
      };

    case 'GET_ALL_USERS':
      return {
        ...state,
        users: [...action.payload]
      };

    case 'TEMP_E_P':
      return {
        ...state,
        tempEP: action.payload
      };

    case 'LOADING':
      return {
        ...state,
        loading: true
      };

    case 'END_LOADING':
      return {
        ...state,
        loading: false
      };

    case 'REMOVE_ERR':
      return {
        ...state,
        authError: null
      };
    default:
      return state;
  }
};

export default authReducer;
