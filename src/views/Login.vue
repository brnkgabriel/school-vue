<template>
  <div id="login">
    <form>
      <div>
        <label for="email">Email:</label>
        <input type="text" id="email" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="text" id="password" />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'login'
}
</script>
