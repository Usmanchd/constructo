import { v4 as uuidv4 } from 'uuid';

export const createProject = _newProject => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  dispatch({ type: 'P_LOADING' });
  const firestore = getFirestore();
  let newProject = {
    ..._newProject,
    ID: uuidv4(),
    createdAt: Date.now(),
    deletedAt: null,
    updatedAt: Date.now(),
    active: true,
    pendingRegistrations: [],
    tags: null,
    taskCategories: null,
    diaryCategories: null,
    spaceLimit: null,
    spaceUsed: null,
    userLimit: null,
    userUsed: null,
    projectDescription: null,
    attendanceKy: null,
    backupPeriod: null,
    subscriptionPlan: null,
    subscriptionPlanValidUntil: null,
    legacy: null,
    legacyId: null,
    legacyContent: null
  };
  await firestore.collection('projects').add(newProject);

  await firestore
    .collection('users')
    .where('ID', '==', newProject.projectCreator)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        const user = doc.data();
        let p = user.projects;
        p.push(_newProject.projectCreator);

        firestore
          .collection('users')
          .doc(doc.id)
          .update({ projects: p });
      });
    });
  dispatch({ type: 'TOGGLE_P_LOADING' });
};

export const getAllProjects = ID => (dispatch, getState, { getFirestore }) => {
  dispatch({ type: 'P_LOADING' });
  const firestore = getFirestore();
  firestore
    .collection('projects')
    .where('projectCreator', '==', ID)
    .get()
    .then(_projects => {
      const projects = _projects.docs.map(doc => doc.data());
      dispatch({ type: 'PROJECTS', payload: projects });
    });
};

export const getThisProject = ID => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  dispatch({ type: 'P_LOADING' });
  const firestore = getFirestore();
  firestore
    .collection('projects')
    .where('ID', '==', ID)
    .get()
    .then(_project => {
      const project = _project.docs.map(doc => doc.data());
      let viewUser = [];
      firestore
        .collection('users')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            let temp = doc.data();
            let newUser = project[0].user.filter(_user => _user === temp.ID);
            if (newUser.length !== 0) viewUser = [...viewUser, { ...temp }];

            console.log(viewUser);
          });

          dispatch({
            type: 'GET_THIS_PROJECT',
            payload: { project: { ...project[0] }, viewUser: viewUser }
          });
          console.log('after');
        });
    });
};

export const updateProject = _updateProject => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  dispatch({ type: 'P_LOADING' });
  const firestore = getFirestore();
  firestore
    .collection('projects')
    .where('ID', '==', _updateProject.ID)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        firestore
          .collection('projects')
          .doc(doc.id)
          .update(_updateProject);
      });
      dispatch(getThisProject(_updateProject.ID));
    });
};
