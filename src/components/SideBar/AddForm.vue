<script>
export default {
  props: ["data"],
  data() {
    return {
      newBoard: "",
      isDisabled: true,
      view: false,
    };
  },
  mounted() {
    this.view = true;
  },

  methods: {
    close() {
      this.newBoard = "";
      this.$emit("close");
      this.isDisabled = true;
    },
    addBoard() {
      this.data.push({
        boardName: this.newBoard,
        boardId: Date.now(),
        lists: [],
      });
      this.close();
    },
    checkDisabled() {
      if (this.newBoard) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },
  },
};
</script>

<template>
  <Transition name="fade">
    <div v-if="view" class="flex flex-col items-center gap-3">
      <div class="w-[90%] bg-white h-[0.05rem]"></div>
      <input
        name="add"
        autofocus
        v-model="newBoard"
        on-focus=""
        @input="checkDisabled"
        type="text"
        class="outline-none w-[90%] rounded-md p-2"
        placeholder="Write a board name"
      />

      <div class="flex justify-between gap-2 w-[90%] text-center">
        <button
          class="active:disabled:scale-100 disabled:brightness-50 hover:disabled:bg-linear active:scale-95 w-1/2 py-2 rounded-md cursor-pointer transition bg-linear hover:bg-linearReverse text-white"
          @click="addBoard"
          :disabled="isDisabled"
        >
          Add
        </button>
        <div
          class="active:scale-95 w-1/2 py-2 rounded-md cursor-pointer transition bg-white hover:text-white hover:bg-red-600"
          @click="close"
        >
          Close
        </div>
      </div>
      <div class="w-[90%] bg-white h-[0.05rem]"></div>
    </div>
  </Transition>
</template>

<style scoped></style>
