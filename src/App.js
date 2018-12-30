
import Navbar from './components/Navbar.vue' 
import NavMenu from "./nav-menu";
export default {
  components: {
    Navbar
  },
  created() {
    this.$store.dispatch('getStudents');
    this.$store.dispatch('getMaterials')
  },
  mounted() {
    // new NavMenu();
  },
}