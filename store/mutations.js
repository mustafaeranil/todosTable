export default {
  setTodos(state, todosData) {
    state.todosData = todosData
  },
  setUsers(state, usersData) {
    state.usersData = usersData
  },
  setTableData(state, tableData) {
    state.tableData = tableData
  },
  pushNotification(state, notification) {
    state.notifications.push({
      ...notification,
      id: Math.random().toString(36) + Date.now().toString(36).substr(2),
    })
  },
  removeNotification(state, notificationToRemove) {
    state.notifications = state.notifications.filter((notification) => {
      return notification.id !== notificationToRemove.id
    })
  },
}
