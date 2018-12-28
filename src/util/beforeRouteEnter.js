import firebase from 'firebase/app';
import 'firebase/auth';


export default function (to, from, next) {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) { next({ path: '/login'}); }
    else { next(); }
  }
}