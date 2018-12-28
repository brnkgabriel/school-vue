<template>
  <nav class="st-menu st-effect-5" id="menu-5">
    <h2>Menu</h2>
    <ul>
      <li><router-link class="nav-link" to="/">Home</router-link></li>
      <li v-if="isLoggedIn"><router-link class="nav-link" to="/profile">Profile</router-link></li>
      <li v-if="isLoggedIn"><router-link class="nav-link" to="/quiz">Quiz</router-link></li>
      <li v-if="isLoggedIn && student.roles_permissions.roles === 'admin'"><router-link class="nav-link" to="/materials">Materials</router-link></li>
      <li v-if="isLoggedIn"><router-link class="nav-link" to="/rank">Rank</router-link></li> 
      <li v-if="!isLoggedIn"><router-link class="nav-link" to="/login">Login</router-link></li>
      <li v-if="!isLoggedIn"><router-link class="nav-link" to="/signup">Signup</router-link></li>
      <li v-if="isLoggedIn"><button class="nav-link" @click="logout">Logout</button></li>
      <li><router-link class="nav-link" to="/about">About</router-link></li>
    </ul>
  </nav>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import { bus } from "../main";
export default {
  name: "navbar",
  data() {
    return {
      isLoggedIn: false,
      student: null
    };
  },
  created() {
    this.student = JSON.parse(localStorage.getItem("student"));
    this.isLoggedIn = !!localStorage.getItem("student");
    bus.$on("isLoggedIn", student => {
      this.isLoggedIn = !!student;
      this.student = student;
    });
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.commit("removeStudent");
          this.isLoggedIn = false;
          this.$router.push("/login");
        });
    }
  }
};
</script>

<style scoped>

</style>
