import { v4 as uuidv4 } from 'uuid';

export const createProject = _newProject => async (
  dispatch,
  getState,
  { getFirestore }
) => {
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
};

export const getAllProjects = ID => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  firestore
    .collection('projects')
    .where('projectCreator', '==', ID)
    .get()
    .then(_projects => {
      const projects = _projects.docs.map(doc => doc.data());
      console.log(projects);
      dispatch({ type: 'PROJECTS', payload: projects });
    });
};
