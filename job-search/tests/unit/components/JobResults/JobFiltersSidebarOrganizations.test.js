import { screen, render } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import JobFiltersSidebarOrganizations from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";

describe("JobFiltersSidebarOrganizations", () => {
  const renderJobFiltersSidebarOrganizations = () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();
    const userStore = useUserStore();

    render(JobFiltersSidebarOrganizations, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    return { jobsStore, userStore };
  };

  it("renders unique list of organizations", async () => {
    const { jobsStore } = renderJobFiltersSidebarOrganizations();

    jobsStore.UNIQ_ORGANIZATIONS = new Set(["Google", "Facebook", "Apple"]);

    const button = screen.getByRole("button", { name: /organizations/i });
    await userEvent.click(button);

    const organizationListItems = screen.getAllByRole("listitem");
    const organizations = organizationListItems.map((item) => item.textContent);
    expect(organizations).toEqual(["Google", "Facebook", "Apple"]);
  });

  it("communicates that user has selected checkbox for organization", async () => {
    const { jobsStore, userStore } = renderJobFiltersSidebarOrganizations();
    jobsStore.UNIQ_ORGANIZATIONS = new Set(["Google", "Facebook", "Apple"]);

    const button = screen.getByRole("button", { name: /organizations/i });
    await userEvent.click(button);

    const googleCheckBox = screen.getByRole("checkbox", { name: /google/i });
    await userEvent.click(googleCheckBox);

    expect(userStore.ADD_SELECTED_ORGANIZATIONS).toHaveBeenCalledWith([
      "Google",
    ]);
  });
});
