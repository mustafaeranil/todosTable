export default {
  actions: {
    async nuxtServerInit({ dispatch }) {
      await dispatch('getTodos')
      return await dispatch('getUsers')
    },
  },
}
