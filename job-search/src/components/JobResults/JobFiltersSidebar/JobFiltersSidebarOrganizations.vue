<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";

const router = useRouter();
const jobsStore = useJobsStore();
const userStore = useUserStore();
const selectedOrganizations = ref([]);
const UNIQ_ORGANIZATIONS = computed(() => jobsStore.UNIQ_ORGANIZATIONS);
const selectOrganization = () => {
  userStore.ADD_SELECTED_ORGANIZATIONS(selectedOrganizations.value);
  router.push({
    name: "JobResults",
  });
};
</script>

<template>
  <collapsible-accordion header="Organizations">
    <div class="mt-5">
      <fieldset>
        <ul
          v-for="organization in UNIQ_ORGANIZATIONS"
          :key="organization"
          class="flex flex-col flex-wrap"
        >
          <li class="h-8">
            <input
              :id="organization"
              v-model="selectedOrganizations"
              :value="organization"
              type="checkbox"
              class="mr-3"
              @change="selectOrganization"
            />
            <label :for="organization">{{ organization }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>
