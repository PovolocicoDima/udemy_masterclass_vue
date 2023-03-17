import { screen, render } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import JobSearchForm from "@/components/JobSearch/JobSearchForm.vue";

describe("JobSearchForm.vue", () => {
  describe("when user submits form", () => {
    it("directs user to job results page with search query", async () => {
      const push = vi.fn();
      const $router = { push };

      render(JobSearchForm, {
        global: {
          mocks: {
            $router,
          },
          stubs: {
            FontAwesomeIcon: true,
          },
        },
      });

      const roleInput = screen.getByRole("textbox", { name: /role/i });
      await userEvent.type(roleInput, "Software Engineer");
      const roleLocation = screen.getByRole("textbox", { name: /Where?/i });
      await userEvent.type(roleLocation, "London");
      const submitButton = screen.getByRole("button", { name: /search/i });
      await userEvent.click(submitButton);

      expect($router.push).toHaveBeenCalledWith({
        name: "JobResults",
        query: {
          role: "Software Engineer",
          location: "London",
        },
      });
    });
  });
});
