import { defineStore } from "pinia";
import { ref } from "vue";

export const ADD_SELECTED_ORGANIZATIONS = "ADD_SELECTED_ORGANIZATIONS";
export const ADD_SELECTED_JOB_TYPES = "ADD_SELECTED_JOB_TYPES";
export const ADD_SELECTED_DEGREES = "ADD_SELECTED_DEGREES";
export const CLEAR_USER_JOB_FILTERS_SELECTED =
  "CLEAR_USER_JOB_FILTERS_SELECTED";

export const useUserStore = defineStore("user", () => {
  const isLoggedIn = ref(false);
  const selectedDegrees = ref<string[]>([]);
  const selectedJobTypes = ref<string[]>([]);
  const selectedOrganizations = ref<string[]>([]);
  const skillsSearchTerm = ref("");

  const LOGIN_USER = () => {
    isLoggedIn.value = true;
  };
  const ADD_SELECTED_ORGANIZATIONS = (organizations: string[]) => {
    selectedOrganizations.value = organizations;
  };
  const ADD_SELECTED_JOB_TYPES = (jobTypes: string[]) => {
    selectedJobTypes.value = jobTypes;
  };
  const ADD_SELECTED_DEGREES = (degrees: string[]) => {
    selectedDegrees.value = degrees;
  };
  const CLEAR_USER_JOB_FILTERS_SELECTED = () => {
    selectedDegrees.value = [];
    selectedJobTypes.value = [];
    selectedOrganizations.value = [];
    skillsSearchTerm.value = "";
  };

  const UPDATE_SKILLS_SEARCH_TERM = (term: string) => {
    skillsSearchTerm.value = term;
  };

  return {
    isLoggedIn,
    selectedDegrees,
    selectedJobTypes,
    selectedOrganizations,
    skillsSearchTerm,
    LOGIN_USER,
    ADD_SELECTED_ORGANIZATIONS,
    ADD_SELECTED_JOB_TYPES,
    ADD_SELECTED_DEGREES,
    CLEAR_USER_JOB_FILTERS_SELECTED,
    UPDATE_SKILLS_SEARCH_TERM,
  };
});
