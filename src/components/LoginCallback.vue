<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoginCallback',
  data() {
    return {
      error: null
    };
  },
  async created () {
    try {
      await this.$userMgr.signinRedirectCallback().then((user) => {
        this.$router.push(user.state || '/');
      })
    } catch (e) {
      this.error = e.toString();
      console.log('LoginCallback.created Error:', e);
    }
  },
  render() {
    return this.error
  }
})
</script>
