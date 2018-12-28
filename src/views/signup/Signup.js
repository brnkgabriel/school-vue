
import methods from './methods-signup'
export default {
  name: 'signup',
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      birthday: null,
      delayToCompleteProcessing: null
    }
  },
  methods: methods
}