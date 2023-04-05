import { createPinia, setActivePinia } from "pinia";
import axios from "axios";

import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";

vi.mock("axios");

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
      axios.get.mockResolvedValue({ data: ["Job 1", "Job 2"] });
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
      { organization: "Google" },
      { organization: "Facebook" },
      { organization: "Google" },
    ];

    const result = store.UNIQ_ORGANIZATIONS;

    expect(result).toEqual(new Set(["Google", "Facebook"]));
  });

  describe("FILTERED_JOBS_BY_ORGANIZATIONS", () => {
    it("filters jobs by selected organizations", () => {
      const jobsStore = useJobsStore();
      jobsStore.jobs = [
        { organization: "Google" },
        { organization: "Facebook" },
        { organization: "Microsoft" },
        { organization: "Amazon" },
      ];

      const userStore = useUserStore();
      userStore.selectedOrganizations = ["Google", "Microsoft"];
      const result = jobsStore.FILTERED_JOBS_BY_ORGANIZATIONS;

      expect(result).toEqual([
        { organization: "Google" },
        { organization: "Microsoft" },
      ]);
    });

    describe("UNIQUE_JOB_TYPES", () => {
      it("finds unique job types from list of jobs", () => {
        const store = useJobsStore();
        store.jobs = [
          { jobType: "Full Time" },
          { jobType: "Part Time" },
          { jobType: "Full Time" },
        ];

        const result = store.UNIQUE_JOB_TYPES;
        expect(result).toEqual(new Set(["Full Time", "Part Time"]));
      });
    });

    describe("when the user has not selected any organizations", () => {
      it("returns all jobs", () => {
        const jobsStore = useJobsStore();
        jobsStore.jobs = [
          { organization: "Google" },
          { organization: "Facebook" },
          { organization: "Microsoft" },
          { organization: "Amazon" },
        ];

        const userStore = useUserStore();
        userStore.selectedOrganizations = [];
        const result = jobsStore.FILTERED_JOBS_BY_ORGANIZATIONS;

        expect(result).toEqual([
          { organization: "Google" },
          { organization: "Facebook" },
          { organization: "Microsoft" },
          { organization: "Amazon" },
        ]);
      });
    });
  });

  describe("FILTERED_JOBS_BY_JOB_TYPES", () => {
    it("filters jobs by selected job types", () => {
      const jobsStore = useJobsStore();
      jobsStore.jobs = [
        { jobType: "Full Time" },
        { jobType: "Part Time" },
        { jobType: "Full Time" },
        { jobType: "Contract" },
      ];
      const userStore = useUserStore();
      userStore.selectedJobTypes = ["Full Time", "Contract"];
      const result = jobsStore.FILTERED_JOBS_BY_JOB_TYPES;
      expect(result).toEqual([
        { jobType: "Full Time" },
        { jobType: "Full Time" },
        { jobType: "Contract" },
      ]);
    });

    describe("when the user has not selected any job types", () => {
      it("returns all jobs", () => {
        const jobsStore = useJobsStore();
        jobsStore.jobs = [
          { jobType: "Full Time" },
          { jobType: "Part Time" },
          { jobType: "Full Time" },
          { jobType: "Contract" },
        ];
        const userStore = useUserStore();
        userStore.selectedJobTypes = [];
        const result = jobsStore.FILTERED_JOBS_BY_JOB_TYPES;
        expect(result).toEqual([
          { jobType: "Full Time" },
          { jobType: "Part Time" },
          { jobType: "Full Time" },
          { jobType: "Contract" },
        ]);
      });
    });
  });
});
