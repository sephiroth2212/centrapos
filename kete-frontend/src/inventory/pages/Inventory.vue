<template>
  <div class="flex flex-col w-full h-full p-8">
    <div class="flex flex-row w-full space-x-8">
      <div class="btn-primary border-2 border-black rounded-3xl p-4 px-16 cursor-pointer" @click="$router.push({ name: 'Inventory Item' })">
        Add
      </div>
      <div class="flex-grow">
        <input type="text" class="w-full h-full" @keydown.enter="doSearch" v-model="searchValue" placeholder="Search">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Inventory",
  data() {
    return {
      searchValue: undefined,
    };
  },
  methods: {
    doSearch() {
      console.log(this.searchValue);
    },
  }
}
</script>
