<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LogoutCallback',
  data() { return { error: null }; },
  created() {
    try {
      this.$userMgr.signoutRedirectCallback().then((resp) => {
        console.log('LogoutCallback.created:', resp);
        this.$router.push(resp.state || '/');
      })
    } catch (e) {
      this.error = e.toString();
      console.log('LogoutCallback.created Error:', e);
    }
  },
  render() {
    return this.error;
  }
})
</script>
