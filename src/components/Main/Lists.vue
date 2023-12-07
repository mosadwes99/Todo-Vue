<script>
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import Todos from "./Todos.vue";

export default {
  props: ["data", "selectedId", "selectedData", "filteredData"],
  emits: ["deleteList", "deleteTodo"],
  data() {
    return {
      blockData: null,
      showData: "",
      addIsOpen: false,
      key: null,
      addTodo: "",
      isDisabled: true,
      listId: null,
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    Todos,
  },
  setup() {
    return {
      modules: [FreeMode],
    };
  },
  methods: {
    openAddInput(e) {
      this.addTodo = "";
      if (e !== this.key) {
        this.addIsOpen = true;
        this.key = e;
        setTimeout(() => {
          this.$refs.input[0].focus();
        }, 1);
      } else if (e === this.key && this.addIsOpen === true) {
        this.addIsOpen = false;
      } else if (e === this.key && this.addIsOpen === false) {
        this.addIsOpen = true;
        setTimeout(() => {
          this.$refs.input[0].focus();
        }, 1);
      }
    },
    deleteList(e) {
      this.$emit("deleteList", e.listId);
    },
    addNewTodo(e) {
      e.push({
        todoName: this.addTodo,
        todoId: Date.now(),
      });
      this.addTodo = "";
      this.isDisabled = true;
      setTimeout(() => {
        let x = document.getElementById("getDown");
        x.scrollTop = x.scrollHeight;
      }, 1);
    },
    cheackIsDisabled() {
      if (this.addTodo) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },
    deleteTodo(e) {
      this.$emit("deleteTodo", {
        listId: this.listId,
        todo: e,
      });
    },
  },
  computed: {
    filterDataCompute() {
      if (this.filteredData) {
        console.log("f");
        return this.selectedData.lists.filter((items) =>
          items.listName.includes(this.filteredData)
        );
      } else {
        console.log("uf");
        return this.selectedData.lists;
      }
    },
  },
};
</script>

<template>
  <div class="w-full p-2">
    <swiper
      :breakpoints="{
        '320': {
          slidesPerView: 1.5,
          spaceBetween: 20,
        },
        '640': {
          slidesPerView: 2.5,
          spaceBetween: 20,
        },
        '768': {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        '1350': {
          slidesPerView: 4,
          spaceBetween: 50,
        },
        '1650': {
          slidesPerView: 4.5,
          spaceBetween: 50,
        },
      }"
      :freeMode="true"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="list in filterDataCompute">
        <div class="flex flex-col gap-1" @mousemove="listId = list.listId">
          <div class="rounded-md overflow-hidden">
            <div
              class="bg-linearReverse flex justify-between px-4 p-3 text-white font-semibold"
            >
              <span class="truncate w-3/4 text-2xl">{{ list.listName }}</span>

              <div class="flex gap-1">
                <img
                  @click="openAddInput(list.listId)"
                  src="../../imgs/add-svgrepo-com.svg"
                  class="w-7 active:scale-95 cursor-pointer"
                  alt="add"
                />
                <img
                  @click="deleteList(list)"
                  src="../../imgs/bin-svgrepo-com.svg"
                  class="w-7 active:scale-95 cursor-pointer"
                  alt="add"
                />
              </div>
            </div>

            <Todos
              :selectedData="list.todos"
              :data="data"
              @deleteTodo="deleteTodo"
            />
          </div>

          <Transition name="fade">
            <div
              class="flex justify-between items-center gap-1"
              v-if="addIsOpen && list.listId === key"
            >
              <input
                @input="cheackIsDisabled"
                ref="input"
                v-model="addTodo"
                name="todo"
                placeholder="Add todo"
                class="bg-[#eee] py-3 px-2 w-4/5 rounded-md focus:outline-blue-300"
                type="text"
              />
              <button
                :disabled="isDisabled"
                @click="addNewTodo(list.todos)"
                class="bg-[#f5d052] p-3 px-6 active:scale-95 cursor-pointer disabled:text-black/40 disabled:active:scale-100 text-black rounded-md"
              >
                Add
              </button>
            </div>
          </Transition>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style scoped></style>
