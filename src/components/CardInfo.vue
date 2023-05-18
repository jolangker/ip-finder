<script setup lang="ts">
const { content } = defineProps<{
  content?: string | number;
  icon?: string;
}>();
</script>

<template>
  <div class="card bg-base-100 shadow-xl px-4 grid items-center rounded h-24 text-base-content">
    <div class="text-xs font-medium xl:text-sm">
      <p>
        <slot>{{ content ?? "-" }}</slot>
      </p>
    </div>
  </div>
</template>
