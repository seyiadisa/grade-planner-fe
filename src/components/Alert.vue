<script setup lang="ts">
import IconClose from "@/components/icons/IconClose.vue";
import IconSuccess from "@/components/icons/IconSuccess.vue";
import IconError from "./icons/IconError.vue";
import { ref } from "vue";

const props = defineProps<{
  success: boolean;
  isOpen: boolean;
}>();
const emit = defineEmits(["closeAlert"]);

function closeAlert() {
  emit("closeAlert");
}
</script>

<template>
  <div id="toast-overlay" v-if="isOpen">
    <div id="toast" :class="{ error: !success }">
      <IconSuccess class="success-icon" v-if="success" />
      <IconError class="success-icon" v-if="!success" />
      <div>
        <h1>
          <slot name="title"></slot>
        </h1>
        <p>
          <slot name="description"></slot>
        </p>
      </div>
      <button @click="closeAlert">
        <IconClose class="close-icon" />
      </button>
    </div>
  </div>
</template>

<style scoped>
#toast-overlay {
  display: flex;
  position: fixed;
  justify-content: center;
  width: 100vw;
  height: 0px;
  bottom: 0;
}

#toast {
  position: absolute;
  bottom: 20px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background-color: var(--color-background);
  display: flex;
  flex-direction: row;
  padding: 12px 8px 12px 12px;
  gap: 12px;
  align-items: center;
  width: 90%;
  z-index: -10;
}

.error {
  border-color: var(--color-border-error) !important;
}

.error h1,
.error p {
  color: var(--color-text-error) !important;
}

#toast div {
  flex-grow: 2;
}

.success-icon {
  width: 28px;
  height: 28px;
}

.close-icon {
  align-self: flex-start;
}

h1 {
  color: var(--color-text-2);
  font-size: 18px;
  font-weight: 600;
}

p {
  color: var(--color-text-1);
  font-weight: 400;
  font-size: 14px;
}

@media (min-width: 640px) {
  #toast {
    width: 60%;
  }
}

@media (min-width: 1024px) {
  #toast {
    width: 50%;
  }
}
</style>
