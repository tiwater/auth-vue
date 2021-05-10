<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoginCallback',
  data() {
    return {
      error: null
    };
  },
  async beforeMount () {
    try {
      await this.$userMgr.signinRedirectCallback()
    } catch (e) {
      this.error = e.toString();
    }
  },
  render() {
    return this.error
  }
})
</script>
