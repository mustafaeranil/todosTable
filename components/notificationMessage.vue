<template>
  <div
    :class="
      notification.type === 'success'
        ? 'bg-green-200 text-green-600'
        : 'bg-red-200 text-red-600'
    "
    class="relative mb-2 p-4 rounded transition-all"
    role="alert"
  >
    <div class="">{{ notification.title }}</div>
    <div class="text-xs">{{ notification.description }}</div>
    <button
      class="notification-close absolute"
      @click="removeNotification(notification)"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    notification: {
      type: Object,
      default() {
        return {
          type: 'success',
          title: 'Example Title',
          description: 'Example Descrition',
        }
      },
    },
  },
  created() {
    setTimeout(() => {
      this.removeNotification(this.notification)
    }, 3000)
  },
  methods: {
    ...mapActions({
      removeNotification: 'removeNotification',
    }),
  },
}
</script>

<style></style>
