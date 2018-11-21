<template>
  <div id="navbar">
    <router-link to="/">Home</router-link> |
    <router-link to="/profile">Profile</router-link> |
    <router-link to="/quiz">Quiz</router-link> |
    <router-link to="/rank">Rank</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/register">Register</router-link>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
  name: "navbar",
  data() {
    return {
      isLoggedIn: false,
      currentUser: false
    }
  },
  methods: {
    logout: function () {
      firebase.auth().signOut()
      .then(() => {
        this.$router.push('/login')
      })
    }
  }
};
</script>

<style scoped>
#navbar {
  padding: 30px;
}

#navbar a {
  font-weight: bold;
  color: #2c3e50;
}

#navbar a.router-link-exact-active {
  color: #42b983;
}
</style>
