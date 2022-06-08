import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyADZ_SUVkrupwzDJgNV2b89y8WPkDHzC4I",
  authDomain: "covid-tracker-2b30b.firebaseapp.com",
  databaseURL: "https://covid-tracker-2b30b-default-rtdb.firebaseio.com/",
  projectId: "covid-tracker-2b30b",
  storageBucket: "covid-tracker-2b30b.appspot.com",
  messagingSenderId: "574807228265",
  appId: "1:574807228265:web:ed10d1de9140857e9d87f8",
  measurementId: "G-115L1XGGBE",
};

export const firebaseApp = initializeApp(firebaseConfig);

export const database = getFirestore(firebaseApp);
