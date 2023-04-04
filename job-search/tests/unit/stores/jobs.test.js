import { createPinia, setActivePinia } from "pinia";
import axios from "axios";

import { useJobsStore } from "@/stores/jobs";

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
});
