<script>
export default {
  data: () => ({
    company: "Dima's Careers",
    url: "https://careers.google.com",
    menuItems: [
      "Teams",
      "Locations",
      "Life at Dima Corp",
      "How we hire",
      "Students",
      "Jobs",
    ],
  }),
};
</script>

<template>
  <header class="brand-green-1 w-full text-3xl">
    <div class="fixed top-0 left-0 h-16 w-full bg-white">
      <div
        class="flex-no-wrap flex h-full border-b border-solid border-brand-gray-1 px-8"
      >
        <a class="flex h-full items-center text-xl" :href="url">{{
          company
        }}</a>

        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none">
            <li
              v-for="menuItem in menuItems"
              :key="menuItem"
              class="ml-9 h-full"
            >
              <a href="" class="5 flex h-full items-center py-2.5">{{
                menuItem
              }}</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>
