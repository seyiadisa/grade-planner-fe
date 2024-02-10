<script setup lang="ts">
import Tile from "@/components/Tile.vue";
import IconResult from "@/components/icons/IconResult.vue";
import IconCourse from "@/components/icons/IconCourse.vue";
import IconEstimate from "@/components/icons/IconEstimate.vue";
import IconArrow from "@/components/icons/IconArrowRight.vue";
</script>

<template>
  <main>
    <header>
      <h1>AWE</h1>
      <span>Start Measuring, Start Growing</span>
      <p>Track your results growth as you estimate with [] in 3 simple steps</p>
    </header>

    <div class="tiles">
      <Tile>
        <template #icon>
          <IconResult />
        </template>
        <template #num>01</template>
        <template #title>Upload Result</template>
        <template #description
          >Upload official/unofficial transcripts or manually enter results for
          past semesters
        </template>
      </Tile>
      <Tile>
        <template #icon>
          <IconCourse />
        </template>
        <template #num>02</template>
        <template #title>Upload Course Structure</template>
        <template #description
          >Upload semester registrations for each semester or manually enter
          course details with grade and credit information</template
        >
      </Tile>
      <Tile>
        <template #icon>
          <IconEstimate />
        </template>
        <template #num>03</template>
        <template #title>Calculate Estimate</template>
        <template #description
          >Set a desired CGPA goal and see the estimated grades needed to
          achieve it</template
        >
      </Tile>
    </div>

    <div class="btn-container">
      <RouterLink to="/upload-result" class="link-button">
        Start estimating
        <IconArrow class="arrow" />
      </RouterLink>
    </div>
  </main>
</template>

<style scoped>
main {
  margin: 20px;
}

header {
  text-align: center;
}

header span {
  font-size: 28px;
  font-weight: 700;
  background: var(--color-linear-gradient);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  /* @apply mx-5; */
}

header p {
  color: var(--color-text-1);
  font-size: 14px;
  font-weight: 500;
  @apply mx-7 my-4;
}

.tiles {
  margin-top: 30px;
  @apply flex flex-col items-center gap-y-8;
}

.btn-container {
  text-align: center;
  @apply my-11;
}

.link-button {
  background: var(--color-text-blue);
  padding: 8px 15px;
  border-radius: 32px;
  color: #fff;
  font-size: 14px;
}

.link-button .arrow {
  display: inline;
  margin-left: 4px;
}

@media (min-width: 640px) {
  main {
    margin: 40px;
  }

  header {
    margin-bottom: 60px;
  }

  header span {
    font-size: 36px;
  }

  header p {
    font-size: 16px;
  }

  .tiles {
    @apply gap-y-12;
  }
}

@media (min-width: 1024px) {
  main {
    margin: 60px;
  }
  header span {
    font-size: 48px;
  }
  .tiles {
    margin: 60px;
    @apply flex-row gap-16;
  }
}
</style>
