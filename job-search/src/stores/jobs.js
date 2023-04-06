import { defineStore } from "pinia";

import getJobs from "@/api/getJobs";

import { useUserStore } from "@/stores/user";

export const FETCH_JOBS = "FETCH_JOBS";
export const UNIQ_ORGANIZATIONS = "UNIQ_ORGANIZATIONS";
export const FILTERED_JOBS = "FILTERED_JOBS";
export const UNIQUE_JOB_TYPES = "UNIQUE_JOB_TYPES";

export const INCLUDE_JOB_BY_ORGANIZATION = "INCLUDE_JOB_BY_ORGANIZATION";
export const INCLUDE_JOB_BY_JOB_TYPE = "INCLUDE_JOB_BY_JOB_TYPE";

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
    [UNIQUE_JOB_TYPES](state) {
      const uniqJobTypes = new Set();
      state.jobs.forEach((job) => uniqJobTypes.add(job.jobType));
      return uniqJobTypes;
    },
    [INCLUDE_JOB_BY_JOB_TYPE]: () => (job) => {
      const userStore = useUserStore();
      const noSelectedByJobType = userStore.selectedJobTypes.length === 0;
      if (noSelectedByJobType) return true;
      return userStore.selectedJobTypes.includes(job.jobType);
    },
    [INCLUDE_JOB_BY_ORGANIZATION]: () => (job) => {
      const userStore = useUserStore();
      const noSelectedJobByOrganization =
        userStore.selectedOrganizations.length === 0;
      if (noSelectedJobByOrganization) return true;
      return userStore.selectedOrganizations.includes(job.organization);
    },
    [FILTERED_JOBS](state) {
      return state.jobs
        .filter((job) => this.INCLUDE_JOB_BY_JOB_TYPE(job))
        .filter((job) => this.INCLUDE_JOB_BY_ORGANIZATION(job));
    },
  },
});
