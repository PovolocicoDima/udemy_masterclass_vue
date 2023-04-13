<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const selectedValues = ref<string[]>([]);

const props = defineProps({
  uniqValues: {
    type: [Set<string>, Array<string>],
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

const userStore = useUserStore();
userStore.$onAction(({ after, name }) => {
  after(() => {
    if (name === "CLEAR_USER_JOB_FILTERS_SELECTED") {
      selectedValues.value = [];
    }
  });
});
</script>

<template>
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
</template>
