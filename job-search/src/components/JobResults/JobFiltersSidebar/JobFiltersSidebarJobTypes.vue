<script setup lang="ts">
import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";
import { computed } from "vue";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const jobsStore = useJobsStore();
const UNIQUE_JOB_TYPES = computed(() => jobsStore.UNIQUE_JOB_TYPES);
</script>

<template>
  <job-filters-sidebar-checkbox-group
    header="Job Types"
    :uniq-values="UNIQUE_JOB_TYPES"
    :action="userStore.ADD_SELECTED_JOB_TYPES"
  />
</template>
