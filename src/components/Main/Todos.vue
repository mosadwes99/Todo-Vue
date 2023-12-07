<script>
export default {
  props: ["selectedData", "data"],
  emits: ["deleteTodo"],
  data() {
    return {
      isEdit: false,
      key: null,
      editKey: null,
      edit: "",
      view:false
    };
  },
  methods: {
    openEdit(e) {
      this.editKey = e.todoId;
      this.edit = e.todoName;
      this.isEdit = true;
    },
    editTodo(e) {
      e.todoName = this.edit;
      this.isEdit = false;
    },
    deleteTodo(e) {
      this.$emit("deleteTodo", e);
    },
  },
  mounted(){
    this.view = true
  }
};
</script>

<template>
  <div
    id="getDown"
    class="transition-all flex flex-col gap-[1px] overflow-y-auto max-h-[45rem]"
  >
    <TransitionGroup name="fade">
      <div v-if="view" v-for="todo in selectedData">
        <Transition name="fade" mode="out-in">
          <div
            v-if="isEdit && todo.todoId === editKey"
            class="flex justify-between p-2 bg-[#262626] items-center gap-1"
          >
            <input
              v-model="edit"
              name="edit"
              placeholder="Edit"
              class="bg-[#eee] p-3 w-[85%] rounded-md focus:outline-blue-300"
              type="text"
            />

            <div class="flex gap-[1px]">
              <img
                @click="editTodo(todo)"
                src="../../imgs/correct-right-arrow-direction-left-down-up-svgrepo-com.svg"
                class="w-8 active:scale-95 cursor-pointer"
                alt="add"
              />

              <img
                @click="isEdit = false"
                src="../../imgs/wrong-svgrepo-com.svg"
                class="w-7 active:scale-95 cursor-pointer"
                alt="add"
              />
            </div>
          </div>

          <div
            v-else
            class="bg-[#262626] flex justify-between p-4 text-white font-semibold"
          >
            <span class="truncate w-3/4 text-xl">{{ todo.todoName }}</span>

            <div class="flex gap-1">
              <img
                @click="openEdit(todo)"
                src="../../imgs/edit-3-svgrepo-com.svg"
                class="w-5 active:scale-95 cursor-pointer"
                alt="edit"
              />

              <img
                @click="deleteTodo(todo)"
                src="../../imgs/bin-svgrepo-com.svg"
                class="w-6 active:scale-95 cursor-pointer"
                alt="delete"
              />
            </div>
          </div>
        </Transition>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped></style>
