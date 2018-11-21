import Vue from 'vue'
import Vuex from 'vuex'
import db from '../firebase/firebase-init'
import firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    students: null,
    student: null
  },
  mutations: {
    setStudents(state, payload) {
      state.students = payload
    },
    setStudent(state, payload) {
      state.student = payload;
    }
  },
  actions: {
    getStudents(context) {
      db.collection('users')
        .onSnapshot(snapshot => {
          var dbStudents = [];
          snapshot.forEach(doc => {
            const student = {
              'email': doc.data().email,
              'first_name': doc.data().first_name,
              'last_name': doc.data().last_name,
              'roles_permissions': doc.data().roles_permissions,
              'uid': doc.data().uid,
              'user_data': doc.data().user_data
            }
            dbStudents.push(student);
          })
          context.commit('setStudents', dbStudents);
        })
    },
    getStudent(context, payload) {
      db.collection('users')
        .where('uid', '==', payload.uid)
        .onSnapshot(snapshot => {
          var dbStudent = {};
          snapshot.forEach(doc => {
            dbStudent = {
              'email': doc.data().email,
              'first_name': doc.data().first_name,
              'last_name': doc.data().last_name,
              'roles_permissions': doc.data().roles_permissions,
              'uid': doc.data().uid,
              'user_data': doc.data().user_data
            }
          })
          context.commit('setStudent', dbStudent);
        })
    },
    addStudent(context, payload) { 
      db.collection("users")
      .doc(payload.uid).set(payload).then(function () {
        console.log("Document successfully written!");
        context.commit('setStudent', payload);
      });
    }
  }
})
