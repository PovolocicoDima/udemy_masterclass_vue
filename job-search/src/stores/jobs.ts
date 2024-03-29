import { defineStore } from "pinia";

import getJobs from "@/api/getJobs";

import { useUserStore } from "@/stores/user";
import type { Job } from "@/api/types";

export const FETCH_JOBS = "FETCH_JOBS";
export const UNIQ_ORGANIZATIONS = "UNIQ_ORGANIZATIONS";
export const FILTERED_JOBS = "FILTERED_JOBS";
export const UNIQUE_JOB_TYPES = "UNIQUE_JOB_TYPES";

export const INCLUDE_JOB_BY_ORGANIZATION = "INCLUDE_JOB_BY_ORGANIZATION";
export const INCLUDE_JOB_BY_JOB_TYPE = "INCLUDE_JOB_BY_JOB_TYPE";
export const INCLUDE_JOB_BY_DEGREE = "INCLUDE_JOB_BY_DEGREE";
export const INCLUDE_JOB_BY_SKILL = "INCLUDE_JOB_BY_SKILL";

export interface JobsState {
  jobs: Job[];
}

export const useJobsStore = defineStore("jobs", {
  state: (): JobsState => ({
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
      const uniqOrganizations = new Set<string>();
      state.jobs.forEach((job) => uniqOrganizations.add(job.organization));
      return uniqOrganizations;
    },
    [UNIQUE_JOB_TYPES](state) {
      const uniqJobTypes = new Set<string>();
      state.jobs.forEach((job) => uniqJobTypes.add(job.jobType));
      return uniqJobTypes;
    },
    [INCLUDE_JOB_BY_JOB_TYPE]: () => (job: Job) => {
      const userStore = useUserStore();
      const noSelectedByJobType = userStore.selectedJobTypes.length === 0;
      if (noSelectedByJobType) return true;
      return userStore.selectedJobTypes.includes(job.jobType);
    },
    [INCLUDE_JOB_BY_ORGANIZATION]: () => (job: Job) => {
      const userStore = useUserStore();
      const noSelectedJobByOrganization =
        userStore.selectedOrganizations.length === 0;
      if (noSelectedJobByOrganization) return true;
      return userStore.selectedOrganizations.includes(job.organization);
    },
    [INCLUDE_JOB_BY_DEGREE]: () => (job: Job) => {
      const userStore = useUserStore();
      const noSelectedJobDegrees = userStore.selectedDegrees.length === 0;
      if (noSelectedJobDegrees) return true;
      return userStore.selectedDegrees.includes(job.degree);
    },
    [INCLUDE_JOB_BY_SKILL]: () => (job: Job) => {
      const userStore = useUserStore();
      return job.title
        .toLowerCase()
        .includes(userStore.skillsSearchTerm.toLowerCase());
    },
    [FILTERED_JOBS](state): Job[] {
      return state.jobs
        .filter((job) => this.INCLUDE_JOB_BY_JOB_TYPE(job))
        .filter((job) => this.INCLUDE_JOB_BY_ORGANIZATION(job))
        .filter((job) => this.INCLUDE_JOB_BY_DEGREE(job))
        .filter((job) => this.INCLUDE_JOB_BY_SKILL(job));
    },
  },
});
