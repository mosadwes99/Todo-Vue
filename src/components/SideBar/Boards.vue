<script>
export default {
  props: ["data"],
  emits: ["deleteB", "selectBoard"],
  data() {
    return {
      optionIsOpened: false,
      key: null,
      editKey: null,
      isEdit: false,
      thisBoard: "",
      isDisabled: false,
      selectedId: null,
      view: false,
    };
  },
  methods: {
    openOption(e) {
      this.optionIsOpened = !this.optionIsOpened;
      this.key = e;
    },
    openEditForm(e) {
      this.editKey = this.key;
      this.thisBoard = e;
      this.isEdit = true;
      this.optionIsOpened = false;
    },
    checkDisabled() {
      if (this.thisBoard) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },
    ChangeBoardName(e) {
      e.boardName = this.thisBoard;
      this.isEdit = false;
    },
    selectBoard(e) {
      this.selectedId = e;
      this.$emit("selectBoard", e);
    },
  },
  computed: {
    deleteBoard() {
      if (this.selectedId === this.key) {
      }
      this.$emit("deleteB", this.key);
      this.optionIsOpened = false;
    },
  },
  mounted() {
    this.view = true;
  },
};
</script>

<template>
  <TransitionGroup name="fade">
    <div v-if="view" v-for="board in data" :key="board.boardId">
      <Transition name="fade" mode="out-in">
        <div
          v-if="isEdit && board.boardId === this.editKey"
          class="flex flex-col items-center gap-3"
        >
          <div class="w-[90%] bg-white h-[0.05rem]"></div>

          <input
            name="edit"
            v-model="thisBoard"
            autofocus
            @input="checkDisabled"
            type="text"
            class="outline-none w-[90%] rounded-md p-2"
            placeholder="Edit a board name"
          />

          <div class="flex justify- gap-2 w-[90%] text-center">
            <button
              :disabled="isDisabled"
              class="active:disabled:scale-100 disabled:brightness-50 hover:disabled:bg-linear active:scale-95 px-7 p-2 w-[70%] rounded-md cursor-pointer transition bg-linear hover:bg-linearReverse text-white"
              @click="ChangeBoardName(board)"
            >
              Change
            </button>

            <div
              class="active:scale-95 px-6 p-2 text-center rounded-md cursor-pointer transition bg-white hover:text-white hover:bg-red-600"
              @click="isEdit = false"
            >
              Close
            </div>
          </div>

          <div class="w-[90%] bg-white h-[0.05rem]"></div>
        </div>

        <div v-else class="flex flex-col items-center gap-3 relative">
          <div class="flex justify-center text-white w-full text-center">
            <div
              @click="selectBoard(board.boardId)"
              class="bg-linear hover:bg-linearReverse p-2 text-2xl transition w-[75%] 2xl:w-4/5 px-10 rounded-md active:scale-95 cursor-pointer truncate"
            >
              {{ board.boardName }}
            </div>

            <img
              @click="openOption(board.boardId)"
              src="../../imgs/dots-vertical-svgrepo-com.svg"
              class="w-8 transition active:scale-95 cursor-pointer"
              alt="dots"
            />
          </div>

          <div class="w-[90%] bg-white h-[0.05rem]"></div>

          <div
            v-if="optionIsOpened && board.boardId === this.key"
            class="flex flex-col bg-white p-3 px-4 rounded-md z-10 gap-1 text-center text-lg absolute end-8 -bottom-16"
          >
            <div
              class="cursor-pointer transition active:scale-95"
              @click="openEditForm(board.boardName)"
            >
              Edit
            </div>
            <div
              @click="deleteBoard"
              class="cursor-pointer transition active:scale-95"
            >
              Delete
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </TransitionGroup>
  
</template>

<style scoped></style>
