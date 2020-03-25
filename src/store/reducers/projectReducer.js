const initState = {
  projects: [],
  project: {},
  loading: false
};

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case 'PROJECTS':
      return { ...state, projects: [...action.payload], loading: false };
    case 'GET_THIS_PROJECT':
      return { ...state, project: action.payload, loading: false };
    case 'P_LOADING':
      return {
        ...state,
        loading: true
      };
    case 'TOGGLE_P_LOADING':
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default projectReducer;
