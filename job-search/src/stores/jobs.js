import { defineStore } from "pinia";

import getJobs from "@/api/getJobs";

import { useUserStore } from "@/stores/user";

export const FETCH_JOBS = "FETCH_JOBS";
export const UNIQ_ORGANIZATIONS = "UNIQ_ORGANIZATIONS";
export const FILTERED_JOBS_BY_ORGANIZATIONS = "FILTERED_JOBS_BY_ORGANIZATIONS";

export const useJobsStore = defineStore("jobs", {
  state: () => ({
    jobs: [],
  }),
  actions: {
    async [FETCH_JOBS]() {
      const jobs = await getJobs();
      this.jobs = jobs;
    },
  },
  getters: {
    [UNIQ_ORGANIZATIONS](state) {
      const uniqOrganizations = new Set();
      state.jobs.forEach((job) => uniqOrganizations.add(job.organization));
      return uniqOrganizations;
    },
    [FILTERED_JOBS_BY_ORGANIZATIONS](state) {
      const userStore = useUserStore();
      const selectedOrganizations = userStore.selectedOrganizations;
      return state.jobs.filter((job) =>
        selectedOrganizations.includes(job.organization)
      );
    },
  },
});
