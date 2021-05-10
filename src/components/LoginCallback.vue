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
      await this.$auth.handleLoginRedirect()
    } catch (e) {
      if (this.$auth.isInteractionRequiredError(e)) {
        const { onAuthResume, onAuthRequired } = this.$auth.options;
        const callbackFn = onAuthResume || onAuthRequired;
        if (callbackFn) {
          callbackFn(this.$auth);
          return;
        }
      }
      this.error = e.toString();
    }
  },
  render() {
    return this.error
  }
})
</script>
