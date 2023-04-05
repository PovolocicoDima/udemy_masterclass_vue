import { defineStore } from "pinia";

import getJobs from "@/api/getJobs";

import { useUserStore } from "@/stores/user";

export const FETCH_JOBS = "FETCH_JOBS";
export const UNIQ_ORGANIZATIONS = "UNIQ_ORGANIZATIONS";
export const FILTERED_JOBS_BY_ORGANIZATIONS = "FILTERED_JOBS_BY_ORGANIZATIONS";
export const FILTERED_JOBS_BY_JOB_TYPES = "FILTERED_JOBS_BY_JOB_TYPES";
export const FILTERED_JOBS = "FILTERED_JOBS";
export const UNIQUE_JOB_TYPES = "UNIQUE_JOB_TYPES";

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
      if (selectedOrganizations.length === 0) return state.jobs;
      return state.jobs.filter((job) =>
        selectedOrganizations.includes(job.organization)
      );
    },
    [UNIQUE_JOB_TYPES](state) {
      const uniqJobTypes = new Set();
      state.jobs.forEach((job) => uniqJobTypes.add(job.jobType));
      return uniqJobTypes;
    },
    [FILTERED_JOBS_BY_JOB_TYPES](state) {
      const userStore = useUserStore();
      const selectedJobTypes = userStore.selectedJobTypes;
      if (selectedJobTypes.length === 0) return state.jobs;
      return state.jobs.filter((job) => selectedJobTypes.includes(job.jobType));
    },
    [FILTERED_JOBS](state) {
      const userStore = useUserStore();

      const noSelectedOrganizations =
        userStore.selectedOrganizations.length === 0;
      const noSelectedJobTypes = userStore.selectedJobTypes.length === 0;

      return state.jobs
        .filter((job) => {
          if (noSelectedOrganizations) return true;
          return userStore.selectedOrganizations.includes(job.organization);
        })
        .filter((job) => {
          if (noSelectedJobTypes) return true;
          return userStore.selectedJobTypes.includes(job.jobType);
        });
    },
  },
});
