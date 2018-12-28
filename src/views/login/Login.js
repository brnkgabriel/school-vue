
import methods from './methods-login'
export default {
  name: "login",
  data() {
    return {
      email: null,
      password: null,
      delayToCompleteProcessing: null
    };
  },
  methods: methods
};