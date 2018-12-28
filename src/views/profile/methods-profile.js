import util from "../../util";
var methods = {
  updateStudent: function(evt) {
    evt.preventDefault();
    this.$store.dispatch("updateStudent", util.encodeStudent(this.student));
  }
}

export default methods