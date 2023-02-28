<script setup>
import { computed, reactive } from "vue";
const company = computed(() => "Dima Careers");
const author = reactive({
  firstName: "Dima",
  lastName: "Pov",
});
</script>

<template>
  <header class="brand-green-1 w-full text-3xl">
    <div class="fixed top-0 left-0 h-16 w-full bg-white">
      <div
        class="flex-no-wrap flex h-full border-b border-solid border-brand-gray-1 px-8"
      >
        <a class="flex h-full items-center text-xl" href="/">{{ company }}</a>
        <h2 class="ml-8 flex h-full items-center">
          Developed by {{ author.firstName }}
        </h2>
      </div>
    </div>
  </header>
</template>
