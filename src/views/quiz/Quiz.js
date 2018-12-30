import beforeRouteEnter from '../../util/beforeRouteEnter';
import util from "../../util";
import { bus } from "../../main";
import SideNav from './sidenav';

export default {
  data() {
    return {
      student: null,
      materials: [],
      quizTypes: util.quizTypes,
      timeline: null,
      modal: null,
      currentPage: 1,
      recordsPerPage: 15,
      search: '',
      selectedTime: util.bibleTimeline[0],
      eventsClass: '',
      selectedMaterials: [],
      loadedMaterial: null
    };
  },
  computed: {
    searched: function () {
      this.timeline = util.searched(this.search, util.bibleTimeline)
      return util.searched(this.search, util.bibleTimeline);
    }
  },
  mounted: function () {
    this.gotoPage('', util.bibleTimeline);
    new SideNav();
    this.modal = document.querySelector('.modal');
  },
  created() {
    this.student = util.localStorage().student;
    this.materials = util.localStorage().materials;
    util.fetchMaterials();

    bus.$on("incomingMaterials", () => {
      this.student = util.localStorage().student;
      this.materials = util.localStorage().materials;
    });
  },
  beforeRouteEnter: beforeRouteEnter,
  methods: {
    toggleModal: function () {
      if (this.modal.classList.contains('is-visible')) {
        this.loadedMaterial = null;
      }
      this.modal.classList.toggle('is-visible')
    },
    loadMaterial: function (material) {
      this.loadedMaterial = material;
      this.toggleModal();
    },
    updateStudent: function (evt) {
      evt.preventDefault();
      this.$store.dispatch("updateStudent", util.encodeStudent(this.student));
    },
    selectTime: function (time) {
      this.selectedTime = time;
      this.eventsClass = 'open';
    },
    gotoPage: function (page) {
      if (page) { page === 'prev' ? this.currentPage-- : this.currentPage++ }
      if (this.currentPage < 1) { this.currentPage = this.numPages(); }
      else if (this.currentPage > this.numPages()) { this.currentPage = 1; }
      return this.changePage(this.currentPage);
    },
    changePage: function (page) {
      this.timeline = util.bibleTimeline.slice(
        util.boundaries(page, this.numPages, this.recordsPerPage).start,
        util.boundaries(page, this.numPages, this.recordsPerPage).end
      )
    },
    numPages: function () {
      return Math.ceil(util.bibleTimeline.length / this.recordsPerPage);
    },
    selectMaterials: function (event) {
      var sMaterials = this.materials.filter(material => {
        return material.event.toLowerCase() === event.toLowerCase()
      })
      this.selectedMaterials = sMaterials;
      this.loadedMaterial = this.selectMaterials[0];
    },
    getThumbnail: function (embedLink) {
      var videoIdArray = embedLink.split('/');
      var videoId = videoIdArray[videoIdArray.length - 1];
      return 'https://img.youtube.com/vi/' + videoId + '/2.jpg';
    }
  }
};