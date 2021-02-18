export default {
  async getTodos({ commit }) {
    const todosData = await this.$axios.$get(
      `https://jsonplaceholder.typicode.com/todos`
    )
    commit('setTodos', todosData)
  },
  async getUsers({ commit }) {
    const usersData = await this.$axios.$get(
      `https://jsonplaceholder.typicode.com/users`
    )
    commit('setUsers', usersData)
  },
  async setTodo({ commit, state, dispatch }, params) {
    await this.$axios
      .patch('https://jsonplaceholder.typicode.com/todos/' + params.id, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        data: {
          title: params.title,
          id: params.id,
          completed: params.completed,
        },
      })
      .then((response) => {
        dispatch(
          'addNotification',
          {
            type: 'success',
            title: 'Succesfull',
            description: 'Your transaction has been completed successfully.',
          },
          { root: true }
        )
        const tableData = []
        for (let i = 0; i < state.tableData.length; i++) {
          tableData.push(Object.assign({}, state.tableData[i]))
          if (state.tableData[i].id === params.id) {
            tableData[i].title = params.title
            tableData[i].completed = params.completed
          }
        }
        commit('setTableData', tableData)
      })
      .catch((error) => {
        dispatch(
          'addNotification',
          {
            type: 'error',
            title: 'Error',
            description:
              'There was a problem while processing your transaction.Error : ' +
              error,
          },
          { root: true }
        )
      })
  },
  async deleteTodo({ commit, state, dispatch }, params) {
    await this.$axios
      .delete('https://jsonplaceholder.typicode.com/todos/' + params.id, {})
      .then((response) => {
        dispatch(
          'addNotification',
          {
            type: 'success',
            title: 'Succesfull',
            description: 'Todo successfully deleted.',
          },
          { root: true }
        )
        const tableData = []
        for (let i = 0; i < state.tableData.length; i++) {
          if (state.tableData[i].id !== params.id) {
            tableData.push(Object.assign({}, state.tableData[i]))
          }
        }
        commit('setTableData', tableData)
      })
      .catch((error) => {
        dispatch(
          'addNotification',
          {
            type: 'error',
            title: 'Error',
            description:
              'There was a problem while deleting Todo.Error : ' + error,
          },
          { root: true }
        )
      })
  },

  setTableData({ commit, state }, params) {
    const todos = [...state.todosData]
    const users = [...state.usersData]
    const sort = params.sort
    if (sort) {
      if (sort === 'asc') {
        todos.sort((a, b) =>
          a.completed > b.completed ? 1 : b.completed > a.completed ? -1 : 0
        )
      } else {
        todos.sort((a, b) =>
          a.completed < b.completed ? 1 : b.completed < a.completed ? -1 : 0
        )
      }
    }
    const usersWithTodos = []
    const dataStartVal = (params.page - 1) * 10
    const dataEndVal = dataStartVal + Math.min(todos.length - dataStartVal, 10)
    let a = 0
    for (let i = dataStartVal; i < dataEndVal; i++) {
      usersWithTodos[a] = Object.assign({}, todos[i])
      for (let b = 0; b < users.length; b++) {
        if (todos[i].userId === users[b].id) {
          usersWithTodos[a].user = users[b]
        }
      }
      a++
    }
    commit('setTableData', usersWithTodos)
  },
  addNotification({ commit }, notification) {
    commit('pushNotification', notification)
  },
  removeNotification({ commit }, notification) {
    commit('removeNotification', notification)
  },
}
