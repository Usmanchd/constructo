const initState = {
  projects: []
};

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case 'PROJECTS':
      return { ...state, projects: [...action.payload] };
    default:
      return state;
  }
};

export default projectReducer;
