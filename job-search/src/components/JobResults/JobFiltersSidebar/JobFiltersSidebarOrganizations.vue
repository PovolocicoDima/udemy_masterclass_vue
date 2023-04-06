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

<script>
import { mapState, mapActions } from "pinia";
import { useJobsStore, UNIQ_ORGANIZATIONS } from "@/stores/jobs";
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";
import { useUserStore, ADD_SELECTED_ORGANIZATIONS } from "@/stores/user";

export default {
  name: "JobFiltersSidebarOrganizations",
  components: { CollapsibleAccordion },
  data: () => ({
    selectedOrganizations: [],
  }),
  computed: {
    ...mapState(useJobsStore, [UNIQ_ORGANIZATIONS]),
  },
  methods: {
    ...mapActions(useUserStore, [ADD_SELECTED_ORGANIZATIONS]),
    selectOrganization() {
      this.ADD_SELECTED_ORGANIZATIONS(this.selectedOrganizations);
      this.$router.push({ name: "JobResults" });
    },
  },
};
</script>
