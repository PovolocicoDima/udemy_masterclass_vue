<script lang="ts" setup>
import { onMounted, ref } from "vue";
import type { Spotlight } from "@/api/types";
import axios from "axios";

const spotlights = ref<Spotlight[]>([]);

const getSpotlights = async () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const url = `${baseUrl}/spotlights`;
  const response = await axios.get<Spotlight[]>(url);
  spotlights.value = response.data;
};

onMounted(getSpotlights);
</script>

<template>
  <ul>
    <li v-for="spotlight in spotlights" :key="spotlight.id">
      <slot
        :img="spotlight.img"
        :title="spotlight.title"
        :description="spotlight.description"
      ></slot>
    </li>
  </ul>
</template>
