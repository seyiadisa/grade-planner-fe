<script setup lang="ts">
import IconArrowUp from "@/components/icons/IconArrowUp.vue";
import IconArrowDown from "@/components/icons/IconArrowDown.vue";
import { ref } from "vue";

const emit = defineEmits(["open"]);
let isOpen = ref<boolean>(false);

function openAccordion(): void {
  isOpen.value = !isOpen.value;
  emit("open");
}
</script>

<template>
  <div class="accordion">
    <button @click="openAccordion">
      <span class="title">
        <slot name="title"></slot>
      </span>
      <span>
        <slot name="description"></slot>
      </span>
      <span>
        <IconArrowUp class="icon" v-if="isOpen" />
        <IconArrowDown class="icon" v-else />
      </span>
    </button>
    <div class="panel" v-show="isOpen">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style scoped>
.accordion {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  width: 100%;
  margin-bottom: 20px;
}

button {
  background-color: var(--color-background-accordion);
  border-radius: 8px;
  padding: 16px 12px;
  width: 100%;
  font-size: 14px;
  @apply flex flex-row justify-between items-center gap-3;
}

button span:first-child {
  color: var(--color-text-blue);
}

button span:nth-child(2) {
  color: var(--color-text-1);
  font-weight: 400;
}

button .icon {
  width: 24px;
  height: 24px;
}

@media (min-width: 640px) {
  button {
    justify-content: space-between;
    @apply px-10;
  }
}

@media (min-width: 640px) {
  .accordion {
    width: 85%;
    margin-bottom: 30px;
    @apply mx-auto;
  }

  button {
    font-size: 16px;
  }

  .title {
    font-weight: 500;
  }
}

@media (min-width: 1024px) {
  .accordion {
    width: 60%;
  }
}
</style>
