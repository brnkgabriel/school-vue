import { bus } from '../../main'
import firebase from "firebase/app";
import "firebase/auth";

var methods = {
  login: function(evt) {
    evt.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
    .then(credential => {
      this.$store.dispatch("getStudent", { uid: credential.user.uid });
      this.delayToCompleteProcessing = setInterval(this.checkStudent, 10);
    }).catch(err => console.log(err));
  },
  checkStudent: function() {
    if (this.$store.state.student) {
      bus.$emit('isLoggedIn', this.$store.state.student);
      this.$router.push("/profile");
      clearInterval(this.delayToCompleteProcessing);
    }
  }
}

export default methods