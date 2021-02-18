<template>
  <div class="container mx-auto">
    <div class="w-full flex flex-col items-center justify-center">
      <h1 class="text-white mb-8 text-5xl font-bold">Todos Table</h1>
      <todosTable :todos="tableData" :data-count="todos.length"></todosTable>
    </div>
  </div>
</template>

<script>
import todosTable from '@/components/todosTable'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    todosTable,
  },
  computed: {
    ...mapGetters({
      todos: 'getAllTodos',
      users: 'getUsers',
      tableData: 'getTableData',
    }),
  },
  created() {
    this.setTableData({
      page: this.$route.params.page,
      sort: this.$route.query.sort,
    })
  },
  methods: {
    ...mapActions({
      setTableData: 'setTableData',
    }),
  },
}
</script>

<style></style>
