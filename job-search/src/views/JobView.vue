<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const currentJobId = computed(() => route.params.id);
</script>

<template>
  <div>Job Page for job {{ currentJobId }}</div>
</template>
