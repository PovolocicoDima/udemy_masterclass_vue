<script setup lang="ts">
import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";
import { computed } from "vue";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";

const jobsStore = useJobsStore();
const userStore = useUserStore();
const UNIQ_ORGANIZATIONS = computed(() => jobsStore.UNIQ_ORGANIZATIONS);
</script>

<template>
  <job-filters-sidebar-checkbox-group
    header="Organizations"
    :uniq-values="UNIQ_ORGANIZATIONS"
    :action="userStore.ADD_SELECTED_ORGANIZATIONS"
  />
</template>
