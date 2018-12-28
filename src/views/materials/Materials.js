import beforeRouteEnter from '../../util/beforeRouteEnter'
import util from '../../util'
import { bus } from '../../main'
import InfiniteList from './infinite-list'
import properties from './properties'

export default {
  data() {
    return {
      materials: [],
      timeline: [],
      tab: { materials: 'tab-current', questions: '' },
      selectedMaterial: null,
      selectedQuestion: null,
      selectedOption: null,
      selectedEvents: null,
      interval: null,
      listElm: null,
      count: 0
    }
  },
  mounted() {
    this.interval = setInterval(this.checkElement, 10)
  },
  created() {
    this.initializeData();
    util.fetchMaterials();

    bus.$on("incomingMaterials", () => {
      this.initializeData();
    })
  },
  beforeRouteEnter: beforeRouteEnter,
  methods: {
    initializeData: function () {
      this.materials = util.localStorage().materials;
      this.selectedMaterial = this.materials[0];
      this.selectedQuestion = this.selectedMaterial.questions[0];
      this.selectedOption = this.selectedQuestion.options[0];
      this.selectedEvents = util.bibleTimeline.find(time => {
        return time.date.toLowerCase() === this.selectedMaterial.time.toLowerCase()
      }).events;
    },
    checkElement: function () {
      this.listElm = document.querySelector('#infinite-list');
      if (this.listElm) {
        this.loadMore();
        this.listElm.addEventListener('scroll', this.handleScroll);
        clearInterval(this.interval)
      }
    },
    handleScroll: function () {
      if (
        this.listElm.scrollTop + this.listElm.clientHeight >= this.listElm.scrollHeight
      ) { this.loadMore(); }
    },
    loadMore: function () {
      var limit = this.count + 20;
      for (var i = this.count; i < limit; i++) {
        if (i === (util.bibleTimeline.length - 1)) { return }
        this.count++;
        this.timeline.push(util.bibleTimeline[i]);
      }
    },
    selectTime: function (time) {
      this.selectedMaterial.time = time.date;
      this.selectedEvents = time.events;
      this.selectedMaterial.event = time.events[0];
    },
    setState: function (selected) {
      var tabKeys = Object.keys(this.tab);
      tabKeys.forEach(key => this.tab[key] = '');
      this.tab[selected] = 'tab-current';
    },
    openQuestion: function (material) {
      this.setState('questions');
      this.selectedMaterial = material;
    },
    selectMaterial: function (material) {
      this.selectedMaterial = material;
    },
    addMaterial: function () {
      this.materials.unshift(properties.newMaterial());
      this.selectedMaterial = this.materials[0]
    },
    saveMaterials: function () {
      this.$store.dispatch('saveMaterials', this.materials)
    },
    selectQuestion: function (question) {
      this.selectedQuestion = question;
      this.selectedOption.value = '';
      this.selectedOption.pts = 0;
    },
    selectOption: function (option) {
      this.selectedOption = option;
    },
    addOption: function () {
      this.selectedQuestion.options.unshift(properties.newOption());
      this.selectedOption = this.selectedQuestion.options[0];
    },
    addQuestion: function () {
      this.selectedMaterial.questions.unshift(properties.newQuestion());
      this.selectedQuestion = this.selectedMaterial.questions[0]
    }
  }
}