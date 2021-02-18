<template>
  <tr class="border-b border-gray-300 text-gray-600 hover:bg-blue-100">
    <td class="px-4 py-2">
      {{ todo.id }}
    </td>
    <td class="px-4 py-2">
      {{ todo.title }}
    </td>
    <td class="px-4 py-2">
      {{ todo.user.name }}
    </td>
    <td
      class="px-4 py-2"
      :class="todo.completed ? 'text-green-500' : 'text-orange-500'"
    >
      {{ todo.completed ? 'Done' : 'In Progress' }}
    </td>
    <td class="px-4 py-2">
      <button
        class="float-left bg-blue-700 text-white rounded px-2 mr-2"
        @click="
          $emit('edit', {
            modalDesc: todo.title,
            todoId: todo.id,
            todoCompleted: todo.completed,
            type: 'edit',
          })
        "
      >
        Edit
      </button>
      <button
        class="bg-red-700 text-white rounded px-2 mr-2"
        @click="$emit('delete', { todoId: todo.id, type: 'delete' })"
      >
        Delete
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    todo: {
      required: true,
      type: [Array, Object],
    },
  },
}
</script>

<style></style>
