<template>
<div>
  Inventory Item
  <div v-if="item" class="btn-primary" @click="$router.push({ name: 'Inventory' })">
    Back
  </div>
  <div v-else class="btn-primary" @click="saveItem">
    Submit
  </div>
</div>
</template>

<script>
export default {
  name: "InventoryItem",
  props: {
    item: {
      type: Object,
      required: false,
      default: undefined,
    }
  },
  methods: {
    saveItem() {
      console.log('Saved');
      this.$router.push({ name: 'Inventory' });
    }
  }
}
</script>

<style scoped>

</style>
