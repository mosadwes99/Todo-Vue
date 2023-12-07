<script>
import SideBar from "./components/SideBar/SideBar.vue";
import Main from "./components/Main/Main.vue";
export default {
  data() {
    return {
      data: [],
      selectedData: null,
      selectedId: null,
      sideIsShow: true,
    };
  },
  components: { SideBar, Main },
  methods: {
    deleteBoard(e) {
      this.data = this.data.filter((board) => board.boardId !== e);
      this.selectBoard(null);
    },
    selectBoard(e) {
      this.selectedId = e;
      this.selectedData = this.data.filter(
        (board) => board.boardId === this.selectedId
      )[0];
    },
    deleteList(id) {
      this.selectedData.lists = this.selectedData.lists.filter(
        (items) => items.listId !== id
      );
    },
    deleteTodo(e) {
      this.selectedData.lists.map((item) => {
        if (item.listId === e.listId) {
          item.todos = item.todos.filter((todo) => todo !== e.todo);
          console.log(e);
        }
      });
    },
    sideToggle() {
      this.sideIsShow = !this.sideIsShow;
    },
  },
};
</script>

<template>
  <div class="w-full h-screen grid grid-cols-6">
    <SideBar
      v-if="sideIsShow"
      :data="data"
      @selectBoard="selectBoard"
      @deleteB="deleteBoard"
      @sideToggle="sideToggle"
    />

    <Main
      :sideIsShow="sideIsShow"
      :data="data"
      :selectedId="selectedId"
      :selectedData="selectedData"
      @deleteList="deleteList"
      @deleteTodo="deleteTodo"
      @sideToggle="sideToggle"
    />
  </div>
</template>

<style scoped></style>
