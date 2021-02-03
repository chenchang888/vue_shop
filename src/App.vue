<template>
  <div id="app">
    <router-view></router-view>
    <FooterNav v-show="$route.meta.requiresAuth" />
  </div>
</template>

<script>
import FooterNav from './components/FooterNav/FooterNav'
export default {
  name: 'App',
  components: {
    FooterNav
  }
}
</script>

<style>
body {
  font-size: 16px;
  --themeColor: #02a774;
}
a {
  text-decoration: none;
  color: #333;
}
div,
span,
header,
button {
  box-sizing: border-box;
}
input,
button {
  outline: none;
  border: none;
}
button {
  background: none;
}
</style>
