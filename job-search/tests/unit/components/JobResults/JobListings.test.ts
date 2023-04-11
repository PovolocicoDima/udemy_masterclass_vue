import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { useRoute } from "vue-router";
vi.mock("vue-router");
import type { Mock } from "vitest";
import JobListings from "@/components/JobResults/JobListings.vue";
import { useJobsStore } from "@/stores/jobs";

const useRouteMock = useRoute as Mock;

describe("JobListings", () => {
  const renderJobListings = () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();
    // @ts-expect-error; Getters readonly
    jobsStore.FILTERED_JOBS = Array(15).fill({});

    render(JobListings, {
      global: {
        plugins: [pinia],
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    return { jobsStore };
  };

  it("fetches jobs", () => {
    useRouteMock.mockReturnValue({ query: {} });
    const { jobsStore } = renderJobListings();
    expect(jobsStore.FETCH_JOBS).toHaveBeenCalled();
  });

  it("displays maximum of 10 jobs", async () => {
    useRouteMock.mockReturnValue({ query: { page: 1 } });
    const { jobsStore } = renderJobListings();
    // @ts-expect-error; Getters readonly
    jobsStore.FILTERED_JOBS = Array(15).fill({});

    const jobListings = await screen.findAllByRole("listitem");
    expect(jobListings).toHaveLength(10);
  });

  describe("when params exclude page number", () => {
    it("displays page number 1", () => {
      const queryParams = { page: undefined };
      useRouteMock.mockReturnValue({ query: queryParams });

      renderJobListings();

      expect(screen.getByText("Page 1")).toBeInTheDocument();
    });
  });

  describe("when params include page number", () => {
    it("displays page number", () => {
      const queryParams = { page: "3" };
      useRouteMock.mockReturnValue({ query: queryParams });

      renderJobListings();

      expect(screen.getByText("Page 3")).toBeInTheDocument();
    });
  });

  describe("when user is on first page", () => {
    it("does not show link to previous page", async () => {
      const queryParams = { page: "1" };
      useRouteMock.mockReturnValue({ query: queryParams });

      const { jobsStore } = renderJobListings();
      // @ts-expect-error; Getters readonly
      jobsStore.FILTERED_JOBS = Array(15).fill({});

      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", {
        name: /previous/i,
      });
      expect(previousLink).not.toBeInTheDocument();
    });

    it("shows link to next page", async () => {
      const queryParams = { page: "1" };
      useRouteMock.mockReturnValue({ query: queryParams });
      const { jobsStore } = renderJobListings();
      // @ts-expect-error; Getters readonly
      jobsStore.FILTERED_JOBS = Array(15).fill({});
      await screen.findAllByRole("listitem");
      const nextLink = screen.queryByRole("link", { name: /next/i });
      expect(nextLink).toBeInTheDocument();
    });
  });

  describe("when user is on last page", () => {
    it("does not show link to next page", async () => {
      const queryParams = { page: "2" };
      useRouteMock.mockReturnValue({ query: queryParams });

      const { jobsStore } = renderJobListings();
      // @ts-expect-error; Getters readonly
      jobsStore.FILTERED_JOBS = Array(15).fill({});

      await screen.findAllByRole("listitem");
      const nextLink = screen.queryByRole("link", { name: /next/i });
      expect(nextLink).not.toBeInTheDocument();
    });

    it("shows link to previous page", async () => {
      const queryParams = { page: "2" };
      useRouteMock.mockReturnValue({ query: queryParams });

      const { jobsStore } = renderJobListings();
      // @ts-expect-error; Getters readonly
      jobsStore.FILTERED_JOBS = Array(15).fill({});

      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", {
        name: /previous/i,
      });
      expect(previousLink).toBeInTheDocument();
    });
  });
});
