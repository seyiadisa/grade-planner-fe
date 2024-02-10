<script setup lang="ts"></script>

<template>
  <div class="tile">
    <div class="num-display">
      <slot name="num"></slot>
    </div>
    <div class="icon">
      <slot name="icon"></slot>
    </div>
    <p class="title">
      <slot name="title"></slot>
    </p>
    <p class="description">
      <slot name="description"></slot>
    </p>
  </div>
</template>

<style scoped>
.tile {
  border-radius: 8px;
  padding: 20px 15px 20px 15px;
  border: 1px solid var(--color-border);
  background-color: var(--color-background-tile);
  /* box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.25), 0px 0px 1px 0px rgba(0, 0, 0, 0.25); */
  @apply flex flex-col w-2/3 items-center;
}

.num-display {
  align-self: flex-start;
  font-size: 16px;
  font-weight: 400;
  color: var(--color-text-4);
}

.icon {
  @apply my-4;
}

.title {
  color: var(--color-text-2);
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 15px;
  text-align: center;
}

.description {
  color: var(--color-text-1);
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  /* @apply mx-4; */
}

@media (min-width: 640px) {
  .tile {
    @apply w-1/2;
  }
  .title {
    font-size: 18px;
  }
  .description {
    font-size: 16px;
  }
}

@media (min-width: 1024px) {
  .tile {
    height: 20em;
  }
}
</style>
