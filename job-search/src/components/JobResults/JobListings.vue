<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";

import JobListing from "@/components/JobResults/JobListing.vue";
import { useJobsStore } from "@/stores/jobs";
import { useDegreeStore } from "@/stores/degrees";
import usePreviousAndNextPages from "@/composables/usePreviousAndNextPage";

const jobsStore = useJobsStore();
const degreesStore = useDegreeStore();
onMounted(degreesStore.FETCH_DEGREES);
onMounted(jobsStore.FETCH_JOBS);

const route = useRoute();

const currentPage = computed(() =>
  parseInt((route.query.page as string) || "1")
);
const FILTERED_JOBS = computed(() => jobsStore.FILTERED_JOBS);
const maxPage = computed(() => Math.ceil(FILTERED_JOBS.value.length / 10));
const { previousPage, nextPage } = usePreviousAndNextPages(
  currentPage,
  maxPage
);

const displayedJobs = computed(() => {
  const firstJobIndex = (currentPage.value - 1) * 10;
  const lastJobIndex = currentPage.value * 10;
  return FILTERED_JOBS.value.slice(firstJobIndex, lastJobIndex);
});
</script>

<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <job-listing v-for="job in displayedJobs" :key="job.id" :job="job" />
    </ol>

    <div class="mx-auto mt-8">
      <div class="flex flex-row flex-nowrap">
        <p class="flex-grow text-sm">Page {{ currentPage }}</p>

        <div class="flex items-center justify-center">
          <router-link
            v-if="previousPage"
            role="link"
            :to="{
              name: 'JobResults',
              query: { page: previousPage },
            }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
          >
            Previous
          </router-link>

          <router-link
            v-if="nextPage"
            role="link"
            :to="{ name: 'JobResults', query: { page: nextPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
          >
            Next
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>
