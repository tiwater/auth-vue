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
      console.log('LoginCallback.created')
      await this.$userMgr.signinRedirectCallback().then((user) => {
        console.log('LoginCallback.created user:', user);
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
