<template>
  <div id="login">
    <form>
      <div>
        <label for="email">Email:</label>
        <input type="text" id="email" v-model="email" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="text" id="password" v-model="password" />
      </div>
      <button @click="login" type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
export default {
  name: 'login',
  data() {
    return {
      email: null,
      password: null,
      delayToCompleteProcessing: null
    }
  },
  methods: { 
    login: function (evt) {
      evt.preventDefault();
      firebase.auth()
      .signInWithEmailAndPassword(this.email, this.password)
      .then(credential => {
        this.$store.dispatch('getStudent', {uid: credential.user.uid});
        this.delayToCompleteProcessing = setInterval(this.checkStudent, 10);
      }).catch(err => console.log(err));
    },
    checkStudent: function () {
      if (this.$store.state.student) {
        this.$router.push('/profile');
        clearInterval(this.delayToCompleteProcessing)
      }
    }
  }
}
</script>
