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