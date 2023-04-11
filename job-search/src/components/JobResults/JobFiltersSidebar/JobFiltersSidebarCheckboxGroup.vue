<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";

const router = useRouter();
const selectedValues = ref<string[]>([]);

const props = defineProps({
  header: {
    type: String,
    required: true,
  },
  uniqValues: {
    type: Set<string>,
    required: true,
  },
  action: {
    type: Function,
    required: true,
  },
});

const selectValue = () => {
  props.action(selectedValues.value);
  router.push({ name: "JobResults" });
};
</script>

<template>
  <collapsible-accordion :header="header">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-col flex-wrap">
          <li v-for="value in uniqValues" :key="value" class="h-8">
            <input
              :id="value"
              v-model="selectedValues"
              :value="value"
              type="checkbox"
              class="mr-3"
              @change="selectValue"
            />
            <label :for="value">{{ value }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>
