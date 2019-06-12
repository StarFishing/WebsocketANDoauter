<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import store from '@/store/index'
export default {
  name: 'App',
  store
}
</script>

<style>
</style>
