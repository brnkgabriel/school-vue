import beforeRouteEnter from '../../util/beforeRouteEnter';
import util from "../../util";
import { bus } from "../../main";
import SideNav from './sidenav'

export default {
  data() {
    return {
      student: null,
      materials: [],
      quizTypes: util.quizTypes,
      timeline: null,
      currentPage: 1,
      recordsPerPage: 15,
      search: '',
      selectedTime: util.bibleTimeline[0],
      eventsClass: '',
      selectedMaterials: []
    };
  },
  computed: {
    searched: function () {
      var filtered = util.bibleTimeline.filter(time => {
        var condition = false;
        if (
          time.date.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 ||
          time.events.join(', ').toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        ) { condition = true; }
        return condition
      })
      this.timeline = filtered;
      return filtered;
    }
  },
  mounted: function () {
    this.gotoPage('', util.bibleTimeline);
    new SideNav();
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
      if (this.currentPage < 1) { this.currentPage = this.numPages();  }
      else if (this.currentPage > this.numPages()) { this.currentPage = 1; }
      return this.changePage(this.currentPage);
    },
    changePage: function (page) {
      var numPages = this.numPages(), start, end; 
      if (page === numPages) {
        start = (page - 1) * this.recordsPerPage;
        end = util.bibleTimeline.length - 1;
      } else {
        end = (page * this.recordsPerPage) - 1;
        start = end - this.recordsPerPage + 1;
      }
      this.timeline = util.bibleTimeline.slice(start, end);
    },
    numPages: function () {
      return Math.ceil(util.bibleTimeline.length / this.recordsPerPage);
    },
    selectMaterials: function (event) {
      var sMaterials = this.materials.filter(material => {
        return material.event.toLowerCase() === event.toLowerCase()
      })
      this.selectedMaterials = sMaterials;
    },
    getThumbnail: function (embedLink) {
      var videoIdArray = embedLink.split('/');
      var videoId = videoIdArray[videoIdArray.length - 1];
      return 'https://img.youtube.com/vi/' + videoId + '/2.jpg';
    }
  }
};