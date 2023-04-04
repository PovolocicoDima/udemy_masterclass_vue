<template>
  <collapsible-accordion header="Organizations">
    <div class="mt-5">
      <fieldset>
        <ul
          v-for="organization in UNIQ_ORGANIZATIONS"
          :key="organization"
          class="flex flex-row flex-wrap"
        >
          <li class="h-8">
            <input :id="organization" type="checkbox" class="mr-3" />
            <label :for="organization">{{ organization }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>

<script>
import { mapState } from "pinia";
import { useJobsStore, UNIQ_ORGANIZATIONS } from "@/stores/jobs";
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";

export default {
  name: "JobFiltersSidebarOrganizations",
  components: { CollapsibleAccordion },
  computed: {
    ...mapState(useJobsStore, [UNIQ_ORGANIZATIONS]),
  },
};
</script>
