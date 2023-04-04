import { screen, render } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import JobFiltersSidebarOrganizations from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue";
import { useJobsStore } from "@/stores/jobs";

describe("JobFiltersSidebarOrganizations", () => {
  it("renders unique list of organizations", async () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();

    jobsStore.UNIQ_ORGANIZATIONS = new Set(["Google", "Facebook", "Apple"]);

    render(JobFiltersSidebarOrganizations, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    const button = screen.getByRole("button", { name: /organizations/i });
    await userEvent.click(button);

    const organizationListItems = screen.getAllByRole("listitem");
    const organizations = organizationListItems.map((item) => item.textContent);
    expect(organizations).toEqual(["Google", "Facebook", "Apple"]);
  });
});
