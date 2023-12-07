<script>
import Nav from "./Nav.vue";
import Lists from "./Lists.vue";
export default {
  props: ["data", "selectedId", "selectedData", "sideIsShow"],
  emits: ["deleteList", "deleteTodo", "sideToggle"],
  components: { Nav, Lists },
  data() {
    return {
      addIsOpen: false,
      newList: "",
      isDisabled: true,
      filteredData: "",
      gridStyle: false,
    };
  },
  methods: {
    closeToggleAdd() {
      this.addIsOpen = false;
      this.newList = "";
    },
    addList() {
      this.data.map((board) => {
        if (board.boardId == this.selectedId) {
          board.lists.push({
            listName: this.newList,
            listId: Date.now(),
            todos: [],
          });
        }
      });
      this.closeToggleAdd();
    },
    deleteList(e) {
      this.$emit("deleteList", e);
    },
    filterData(e) {
      this.filteredData = e;
      console.log(this.filteredData);
    },
    deleteTodo(e) {
      this.$emit("deleteTodo", e);
    },
    sideToggle() {
      console.log(this.gridStyle);
      this.$emit("sideToggle");
    },
  },
};
</script>

<template>
  <div
    class="md:col-span-5 transition-transform duration-200 flex flex-col gap-3 h-screen overflow-hidden col-span-6"
    :class="{ 'md:col-span-6': !sideIsShow }"
  >
    <Nav
      @filter="filterData"
      :sideIsShow="sideIsShow"
      @sideToggle="sideToggle"
    />

    <div
      v-if="selectedId"
      class="text-white text-center flex md:px-2 px-3 justify-between text-2xl"
    >
      <div class="bg-black rounded-md h-fit p-2">
        {{ selectedData.boardName }}
      </div>

      <div
        @click="addIsOpen = true"
        class="bg-linear hover:bg-linearReverse cursor-pointer transition active:scale-95 p-1 rounded-md w-[12%] md:m-0 me-3"
      >
        <span class="hidden md:block">Add List</span>
        <span class="md:hidden block"
          ><img src="../../imgs/add-svgrepo-com.svg" alt="" class="w7"
        /></span>
      </div>
    </div>

    <Lists
      v-if="selectedId"
      :filteredData="filteredData"
      :data="data"
      :selectedId="selectedId"
      :selectedData="selectedData"
      @deleteList="deleteList"
      @deleteTodo="deleteTodo"
    />

    <Transition name="op">
      <div
        v-if="addIsOpen"
        class="w-full h-screen top-0 z-50 left-0 absolute br bg-black/50 flex justify-center items-start"
      >
        <div
          class="bg-white md:w-1/2 w-4/5 p-4 rounded-lg z-50 relative top-24"
        >
          <div class="flex justify-between text-3xl border-b-2 p-1">
            <div>Add New List</div>

            <img
              @click="closeToggleAdd"
              class="w-7 active:scale-95 cursor-pointer hover:text-red-500 transition"
              src="../../imgs/wrong-delete-remove-trash-minus-cancel-close-2-svgrepo-com.svg"
              alt="X"
            />
          </div>

          <div class="mt-4">
            <span class="p-1">New List Title</span>
            <input
              v-model="newList"
              placeholder="Enter List Title "
              class="bg-[#eee] py-3 px-2 mt-2 w-full rounded-md focus:outline-blue-300"
              type="text"
            />
          </div>

          <div class="w-full flex justify-center mt-16">
            <button
              :disabled="!newList"
              @click="addList"
              class="disabled:brightness-50 hover:disabled:bg-linear active:disabled:scale-100 active:scale-95 md:w-1/6 w-1/2 text-center py-2 rounded-md cursor-pointer transition bg-linear hover:bg-linearReverse text-white"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped></style>
