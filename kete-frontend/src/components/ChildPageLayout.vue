<template>
  <div class="h-full bg-surface-secondary">
    <div class="h-full flex flex-col">
      <!-- Header -->
      <div>
        <div class="fixed top-0 left-0 right-0 bg-surface-secondary w-full">
          <div class="desktop-gutters grid grid-cols-6 gap-2 p-2">
            <back-button />
            <div class="flex justify-center text-center col-span-4">
              <slot name="header" />
            </div>
            <slot name="info" />
          </div>
        </div>
        <!-- Not visible, but so flex knows height of flex element -->
        <div class="invisible">
          <div class="desktop-gutters grid grid-cols-6 gap-2 p-2">
            <back-button />
            <div class="flex justify-center text-center col-span-4">
              <slot name="header" />
            </div>
            <slot name="info" />
          </div>
        </div>
      </div>

      <div class="overflow-auto flex flex-col flex-grow">
        <div class="desktop-gutters flex-1 overflow-visible">
          <slot name="content" />
        </div>

        <!-- Not visible, but so flex knows height of flex element -->
        <div class="invisible w-full">
          <slot name="footer" />
        </div>
        <div
          id="child-page-layout-footer"
          class="desktop-gutters fixed bottom-0 left-0 right-0 w-full bg-surface-secondary"
        >
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>
