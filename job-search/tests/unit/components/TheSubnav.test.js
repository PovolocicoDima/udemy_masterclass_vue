import { render, screen } from "@testing-library/vue";

import TheSubnav from "@/components/TheSubnav.vue";

describe("TheSubnav", () => {
  describe("when user is on jobs page", () => {
    it("displays Job count", () => {
      render(TheSubnav, {
        global: {
          stubs: {
            FontAwesomeIcon: true,
          },
        },
        data() {
          return {
            onJobResultPage: true,
          };
        },
      });

      const jobCount = screen.getByText("1653");

      expect(jobCount).toBeInTheDocument();
    });
  });
  describe("when user is not on jobs page", () => {
    it("does NOT display job count", () => {
      render(TheSubnav, {
        global: {
          stubs: {
            FontAwesomeIcon: true,
          },
        },
        data() {
          return {
            onJobResultPage: false,
          };
        },
      });

      const jobCount = screen.queryByText("1653");

      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
