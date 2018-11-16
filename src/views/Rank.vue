<template>
  <div id="rank">
    <h1>Rank</h1>
    <ul>
      <li v-for="(student, index) in students" :key="index">
        {{student.first_name}}-{{student.last_name}}
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  data() {
    return {
      
    };
  },
  computed: {
    students: function () {
      return this.$store.state.students;
    }
  }
};
</script>

<style scoped>
</style>
