<template>
  <div class="w-full flex flex-col items-center justify-center">
    <div>
      <table class="table-auto shadow-xl bg-white rounded overflow-hidden">
        <thead class="bg-gray-700 text-white">
          <tr>
            <th class="p-4">#</th>
            <th class="p-4">Title</th>
            <th class="p-4">Assignee</th>
            <th
              class="p-4 flex items-center"
              :class="$route.query.sort === 'asc' ? 'sort-desc' : 'sort-asc'"
              @click="changeSort()"
            >
              Status
            </th>
            <th class="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <todoItem
            v-for="todo in todos"
            :key="todo.id"
            :todo="todo"
            @edit="modalEdit"
            @delete="modalDelete"
          ></todoItem>
        </tbody>
      </table>
    </div>
    <paginationt :data-count="dataCount"></paginationt>
    <modal
      v-show="success"
      id="editModal"
      :todo-item="todoItem"
      title="Edit"
      :descr="modalDesc"
      :type="modalType"
      :completed="todoCompleted"
      @close="success = false"
      @accept="todoAccept"
      @delete="todoDelete"
    >
    </modal>
    <notification></notification>
  </div>
</template>

<script>
import todoItem from '@/components/todoItem'
import modal from '@/components/modal'
import paginationt from '@/components/pagination'
import notification from '@/components/notification'
import { mapActions } from 'vuex'
export default {
  components: {
    todoItem,
    paginationt,
    modal,
    notification,
  },
  props: {
    todos: {
      required: true,
      type: [Array, Object],
    },
    dataCount: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      tableSort: '',
      success: false,
      modalDesc: 'tt',
      todoItem: 0,
      notificationSettings: {},
      todoCompleted: false,
      modalType: 'edit',
    }
  },
  computed: {
    notificationSettingsComp() {
      return this.notificationSettings
    },
  },
  mounted() {
    this.tableSort = localStorage.getItem('tableSort')
  },
  methods: {
    ...mapActions({
      setTableData: 'setTableData',
      setTodo: 'setTodo',
      deleteTodo: 'deleteTodo',
    }),
    changeSort() {
      const tableSort = this.$route.query.sort
      const setTableSort = (sort) => {
        return sort ? (sort === 'asc' ? (sort = 'desc') : (sort = '')) : 'asc'
      }
      this.$router.push({ query: { sort: setTableSort(tableSort) } })

      this.setTableData({
        page: this.$route.params.page,
        sort: setTableSort(tableSort),
      })
    },
    modalEdit(obj) {
      this.modalDesc = obj.modalDesc
      this.todoCompleted = obj.todoCompleted
      this.todoItem = obj.todoId
      this.success = true
      this.modalType = 'edit'
    },
    modalDelete(obj) {
      this.todoItem = obj.todoId
      this.modalType = 'delete'
      this.success = true
    },
    todoAccept(obj) {
      this.success = false
      this.setTodo({
        id: obj.todoItem,
        title: obj.todoDesc,
        completed: obj.todoCompleted,
      })
    },
    todoDelete(obj) {
      this.success = false
      this.deleteTodo({ id: obj.todoItem })
    },
  },
}
</script>

<style>
.sort-asc:after {
  content: '';
  display: block;
  width: 0;
  height: 0;
  margin-left: 5px;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 10px solid #fff;
}
.sort-desc:after {
  content: '';
  display: block;
  width: 0;
  height: 0;
  margin-left: 10px;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 10px solid #fff;
}
</style>
