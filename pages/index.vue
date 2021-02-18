<template>
  <div class="container">
    <div class="w-full">
      <h1>Todos Table</h1>
      <todosTable :todos="usersWithTodos"></todosTable>
    </div>
  </div>
</template>

<script>
import todosTable from '@/components/todosTable'
import { mapGetters } from 'vuex'
export default {
  components: {
    todosTable,
  },
  computed: {
    ...mapGetters({
      usersWithTodos: 'getUsersWithTodos',
    }),
  },
}
</script>

<style></style>
