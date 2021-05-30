<template>
  <div id="app">
    <div class="ui inverted top fixed menu">
      <NavigationBar />
    </div>
    <div
      class="ui text container"
      style="margin-top: 7em;"
    >
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavigationBar from './components/NavigationBar.vue';

export default defineComponent({
  components: { NavigationBar }
})

</script>
