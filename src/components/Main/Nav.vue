<script>
export default {
  props: ["sideIsShow"],
  emits: ["filter", "sideToggle"],
  data() {
    return {
      filterData: "",
    };
  },
  methods: {
    filter() {
      this.$emit("filter", this.filterData);
    },
    sideToggle() {
      this.$emit("sideToggle");
    },
  },
};
</script>

<template>
  <div
    class="bg-linear w-full px-6 p-2 text-white flex justify-between items-center"
  >
    <img
      @click="sideToggle"
      src="../../imgs/toggle-column-svgrepo-com.svg"
      alt="toggle"
      class="w-7 active:scale-95 cursor-pointer"
    />

    <span class="block font-semibold text-2xl">Todo</span>

    <input
      @input="filter"
      v-model="filterData"
      name="search"
      type="text"
      class="outline-none w-[18%] rounded-md p-2 block text-black"
      placeholder="Search"
    />
  </div>
</template>

<style scoped></style>
