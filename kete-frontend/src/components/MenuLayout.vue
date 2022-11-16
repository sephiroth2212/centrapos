<template>
  <div class="flex h-full w-full">
    <div class="flex flex-col bg-black h-full text-content-inverse-primary space-y-8 p-8">
      <div class="btn-primary bg-grey-700 border-2 border-gray-500 p-4 rounded-xl cursor-pointer" @click="$router.push({ name: 'Inventory' })">
        Inventory
      </div>
      <div class="btn-primary bg-grey-700 border-2 border-gray-500 p-4 rounded-xl cursor-pointer" @click="$router.push({ name: 'Sales' })">
        Sales
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: "MenuLayout"
}
</script>

<style scoped>

</style>
