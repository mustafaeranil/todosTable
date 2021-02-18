<template>
  <transition name="modal">
    <div class="modal" @click="$emit('close')">
      <div class="modal__overlay" @click="$emit('close')">
        <div class="modal__content" @click.stop>
          <p
            class="modal__content-title mb-0 text-2xl font-bold mb-2 text-gray-600"
          >
            {{ modalType === 'edit' ? 'Edit' : 'Delete Todo' }}
          </p>
          {{
            modalType === 'delete' ? 'Are you sure to delete this Todo?' : null
          }}
          <p v-if="modalType === 'edit'" class="modal__content-descr mb-3">
            <input
              v-model="todoDesc"
              type="textbox"
              class="border border-gray-400 rounded px-4 py-2"
            />
          </p>
          <div v-if="modalType === 'edit'">
            Completed :<input
              v-model="todoCompleted"
              class="ml-2"
              type="checkbox"
            />
          </div>
          <div class="w-full">
            <div class="flex float-right">
              <button
                v-if="modalType === 'edit'"
                class="modal__accept mr-2 px-4 py-2 text-white rounded"
                @click="
                  $emit('accept', {
                    todoItem: todoItem,
                    todoDesc: todoDesc,
                    todoCompleted: todoCompleted,
                  })
                "
              >
                Save
              </button>
              <button
                v-if="modalType === 'delete'"
                class="modal__delete mr-2 px-4 py-2 text-white rounded"
                @click="
                  $emit('delete', {
                    todoItem: todoItem,
                  })
                "
              >
                Delete
              </button>
              <button
                class="modal__close px-4 py-2 text-white rounded"
                @click="$emit('close')"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    descr: {
      type: String,
      default: '',
    },
    todoItem: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      default: 'edit',
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      todoDesc: this.$props.descr,
      todoCompleted: this.$props.completed,
      modalType: this.$props.type,
    }
  },
  watch: {
    descr(value) {
      this.todoDesc = value
    },
    completed(value) {
      this.todoCompleted = value
    },
    type(value) {
      this.modalType = value
    },
  },
}
</script>
<style lang="scss" scoped>
.modal {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  &__overlay {
    background: rgba(22, 32, 47, 0.25);
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__accept {
    background: rgb(19, 85, 184);
  }
  &__delete {
    background: rgb(184, 19, 19);
  }
  &__close {
    background: rgb(116, 116, 116);
  }
  &__content {
    position: relative;
    width: 700px;
    max-width: 95%;
    background: #fff;
    box-shadow: 0 10px 30px rgba(102, 117, 171, 0.24);
    border-radius: 12px;
    padding: 2rem 1rem 1rem 1rem;
    height: auto;
  }
}
</style>
