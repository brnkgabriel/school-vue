import Vue from 'vue'
import Vuex from 'vuex'
import db from '../firebase/firebase-init'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    students: null,
    student: null
  },
  mutations: {
    setStudents(state, payload){
      state.students = payload
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
        // context.state.students = dbStudents;
      })
    }
  }
})
