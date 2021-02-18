<template>
  <div class="notification">
    <notificationMessage
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    ></notificationMessage>
  </div>
</template>

<script>
import notificationMessage from '@/components/notificationMessage'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    notificationMessage,
  },
  computed: {
    ...mapGetters({
      notifications: 'getNotifications',
    }),
  },
  methods: {
    ...mapActions({
      addNotification: 'addNotification',
    }),
  },
}
</script>

<style>
.notification {
  width: 300px;
  top: 20px;
  right: 20px;
  z-index: 9999;
  position: fixed;
  display: flex;
  flex-direction: column;
}
.notification-close {
  right: 5px;
  top: 5px;
  line-height: 1;
  display: block;
  height: 10px;
}
</style>
