<template>
  <div id="register">
    <form>
      <div>
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" v-model="firstName" />
      </div>
      <div>
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="lastName" />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="text" id="email" v-model="email" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="text" id="password" v-model="password" />
      </div>
      <button @click="register" type="submit">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'register',
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      password: null
    }
  },
  methods: {
    register: function (evt) {
      evt.preventDefault();
      console.log('register clicked');
      this.$store.dispatch('register', {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>
