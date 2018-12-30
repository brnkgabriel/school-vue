
import beforeRouteEnter from '../../util/beforeRouteEnter'
import util from "../../util"
import methods from './methods-profile'
import { bus } from '../../main'

export default {
  data() {
    return {
      student: {
        email: null,
        first_name: null,
        last_name: null,
        roles_permissions: null,
        uid: null,
        user_data: null
      },
    };
  },
  created() {
    this.student = util.localStorage().student
    this.materials = util.localStorage().materials
    util.fetchMaterials()
    bus.$on('incomingMaterials', () => {
      this.student = util.localStorage().student
      this.materials = util.localStorage().materials
    })
  },
  computed: {
    students: function () {
      return this.$store.state.students;
    }
  },
  beforeRouteEnter: beforeRouteEnter,
  methods: methods
};