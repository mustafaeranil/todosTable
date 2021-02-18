<template v-if="dataCount">
  <div class="mt-8 p-2 bg-white rounded-full">
    <div v-for="index in dataCount / perPage" :key="index" class="float-left">
      <NuxtLink
        :class="
          parseInt($route.params.page) === index
            ? 'bg-blue-400 text-white'
            : null
        "
        class="m-1 rounded-full block w-6 h-6 text-xs leading-6 bg-gray-200 text-center hover:bg-blue-400 hover:text-white"
        :to="'/' + index + '?sort=' + $route.query.sort"
      >
        {{ index }}
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    perPage: {
      type: Number,
      default: 10,
    },
    dataCount: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<style></style>
