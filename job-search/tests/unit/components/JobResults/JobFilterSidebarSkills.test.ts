import { screen, render } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import { useUserStore } from "@/stores/user";

import JobFilterSidebarSkills from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarSkills.vue";

describe("JobFilterSidebarSkills", () => {
  const renderJobFilterSidebarSkills = () => {
    const pinia = createTestingPinia();
    const userStore = useUserStore();

    render(JobFilterSidebarSkills, {
      global: {
        plugins: [pinia],
      },
    });

    return { userStore };
  };

  it("populates search input from store", async () => {
    const { userStore } = renderJobFilterSidebarSkills();
    userStore.skillsSearchTerm = "Programmer";
    const skillsInput = await screen.findByRole<HTMLInputElement>("textbox");
    expect(skillsInput.value).toBe("Programmer");
  });

  it("write users input to store", async () => {
    const { userStore } = renderJobFilterSidebarSkills();
    userStore.skillsSearchTerm = "";
    const skillsInput = screen.getByRole<HTMLInputElement>("textbox");
    await userEvent.type(skillsInput, "V");
    await userEvent.click(document.body);
    expect(userStore.UPDATE_SKILLS_SEARCH_TERM).toHaveBeenCalledWith("V");
  });

  it("removes white spaces from users input", async () => {
    const { userStore } = renderJobFilterSidebarSkills();
    userStore.skillsSearchTerm = "";
    const skillsInput = screen.getByRole<HTMLInputElement>("textbox");
    await userEvent.type(skillsInput, "      Vue developer    ");
    await userEvent.click(document.body);
    expect(userStore.UPDATE_SKILLS_SEARCH_TERM).toHaveBeenCalledWith(
      "Vue developer"
    );
  });
});
