import { defineStore } from "pinia";

import getJobs from "@/api/getJobs";

export const FETCH_JOBS = "FETCH_JOBS";
export const UNIQ_ORGANIZATIONS = "UNIQ_ORGANIZATIONS";

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
    [UNIQ_ORGANIZATIONS]() {
      const uniqOrganizations = new Set();
      this.jobs.forEach((job) => uniqOrganizations.add(job.organization));
      return uniqOrganizations;
    },
  },
});
