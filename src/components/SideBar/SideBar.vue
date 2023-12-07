<script>
import AddForm from "./AddForm.vue";
import Boards from "./Boards.vue";
export default {
  components: { AddForm, Boards },
  emits: ["deleteB", "selectBoard", "sideToggle"],
  props: ["data"],
  data() {
    return {
      isAddedBoard: false,
      newBoard: "",
    };
  },
  methods: {
    openAddForm() {
      this.isAddedBoard = !this.isAddedBoard;
    },
    closeAddNew() {
      this.isAddedBoard = false;
    },
    deleteBoard(e) {
      this.$emit("deleteB", e);
    },
    selectBoard(e) {
      this.$emit("selectBoard", e);
    },
    toggleCloseSide() {
      this.$emit("sideToggle");
    },
  },
};
</script>

<template>
  <div
    class="h-full bg-[#262626] col-span-1 z-50 md:sticky flex flex-col justify-between fixed"
  >
    <div class="flex flex-col gap-6">
      <div class="flex justify-center items-center font-medium p-5 gap-3">
        <span class="text-white text-5xl">Todo</span>

        <img
          src="../../imgs/Microsoft_To-Do_icon.png"
          alt="Todo.ico"
          class="w-12"
        />
      </div>

      <div class="flex justify-center" @click="openAddForm">
        <div class="btn">
          <span class="text-2xl text-center">ADD NEW BOARD</span>

          <img src="../../imgs/add-svgrepo-com.svg" class="w-7" alt="Plus" />
        </div>
      </div>

      <AddForm
        v-if="this.isAddedBoard"
        @close="closeAddNew"
        newBoard="newBoard"
        :data="data"
      />

      <Transition name="fade">
        <Boards
          :data="data"
          @deleteB="deleteBoard"
          @selectBoard="selectBoard"
        />
      </Transition>
    </div>

    <div class="p-8 flex justify-center md:hidden">
      <img
        src="../../imgs/toggle-column-svgrepo-com.svg"
        alt="toggle"
        class="w-7 active:scale-95 cursor-pointer"
        @click="toggleCloseSide"
      />
    </div>
  </div>
</template>

<style scoped></style>
