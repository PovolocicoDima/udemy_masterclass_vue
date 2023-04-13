<script setup lang="ts">
import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";
import { computed } from "vue";
import { useDegreeStore } from "@/stores/degrees";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
const degreesStore = useDegreeStore();
const UNIQUE_DEGREES = computed(() => degreesStore.UNIQUE_DEGREES);
</script>

<template>
  <job-filters-sidebar-checkbox-group
    :uniq-values="UNIQUE_DEGREES"
    :action="userStore.ADD_SELECTED_DEGREES"
  />
</template>
