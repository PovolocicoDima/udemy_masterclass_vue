import { createPinia, setActivePinia } from "pinia";
import axios from "axios";
import type { Mock } from "vitest";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
import { createJob } from "../../../src/utils/createJob";

vi.mock("axios");
const axiosGetMock = axios.get as Mock;

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("stores job listings", () => {
    const store = useJobsStore();
    expect(store.jobs).toEqual([]);
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("FETCH_JOBS", () => {
    it("makes API request and stores received jobs", async () => {
      axiosGetMock.mockResolvedValue({ data: ["Job 1", "Job 2"] });
      const store = useJobsStore();
      await store.FETCH_JOBS();
      expect(store.jobs).toEqual(["Job 1", "Job 2"]);
    });
  });
});

describe("getters", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("finds unique organizations from list of jobs", () => {
    const store = useJobsStore();
    store.jobs = [
      createJob({ organization: "Google" }),
      createJob({ organization: "Facebook" }),
      createJob({ organization: "Google" }),
    ];

    const result = store.UNIQ_ORGANIZATIONS;

    expect(result).toEqual(new Set(["Google", "Facebook"]));
  });

  describe("UNIQUE_JOB_TYPES", () => {
    it("finds unique job types from list of jobs", () => {
      const store = useJobsStore();
      store.jobs = [
        createJob({ jobType: "Full Time" }),
        createJob({ jobType: "Part Time" }),
        createJob({ jobType: "Full Time" }),
      ];

      const result = store.UNIQUE_JOB_TYPES;
      expect(result).toEqual(new Set(["Full Time", "Part Time"]));
    });
  });

  describe("INCLUDE_JOB_BY_ORGANIZATION", () => {
    describe("when user has NOT selected any organization", () => {
      it("includes job", () => {
        const userStore = useUserStore();
        userStore.selectedOrganizations = [];
        const jobsStore = useJobsStore();
        const job = createJob({ organization: "Google" });

        const result = jobsStore.INCLUDE_JOB_BY_ORGANIZATION(job);
        expect(result).toBe(true);
      });
    });

    it("identifies if job is associated with given organizations", () => {
      const userStore = useUserStore();
      userStore.selectedOrganizations = ["Google", "Microsoft"];
      const jobsStore = useJobsStore();
      const job = createJob({ organization: "Google" });

      const result = jobsStore.INCLUDE_JOB_BY_ORGANIZATION(job);
      expect(result).toBe(true);
    });
  });

  describe("INCLUDE_JOB_BY_JOB_TYPE", () => {
    describe("when user has NOT selected any job types", () => {
      it("includes job", () => {
        const userStore = useUserStore();
        userStore.selectedJobTypes = [];
        const jobsStore = useJobsStore();
        const job = createJob({ jobType: "Part-time" });

        const result = jobsStore.INCLUDE_JOB_BY_JOB_TYPE(job);
        expect(result).toBe(true);
      });
    });

    it("identifies if job is associated with given job types", () => {
      const userStore = useUserStore();
      userStore.selectedJobTypes = ["Part-time", "Full-time"];
      const jobsStore = useJobsStore();
      const job = createJob({ jobType: "Part-time" });

      const result = jobsStore.INCLUDE_JOB_BY_JOB_TYPE(job);
      expect(result).toBe(true);
    });
  });
});
