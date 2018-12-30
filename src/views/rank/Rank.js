
import beforeRouteEnter from '../../util/beforeRouteEnter'
export default {
  computed: {
    students: function () {
      return this.$store.state.students;
    }
  },
  beforeRouteEnter: beforeRouteEnter
};