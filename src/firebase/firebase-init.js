import firebase from 'firebase/app'
import 'firebase/firestore/dist/index.cjs'
import firebaseConfig from './firebase-config'

const firebaseApp = firebase.initializeApp(firebaseConfig)
const firestore = firebaseApp.firestore()

firestore.settings({ timestampsInSnapshots: true })

export default firestore;