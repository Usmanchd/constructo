import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// Replace this with your own config details
var config = {
  apiKey: 'AIzaSyBYGDQc-sjJJT_YqNhUJsxVkFN7GakWb8w',
  authDomain: 'abstract-lane-269917.firebaseapp.com',
  databaseURL: 'https://abstract-lane-269917.firebaseio.com',
  projectId: 'abstract-lane-269917',
  storageBucket: 'abstract-lane-269917.appspot.com',
  messagingSenderId: '359798242190',
  appId: '1:359798242190:web:341bc749f03b14133902df',
  measurementId: 'G-BD2PWF933P'
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
