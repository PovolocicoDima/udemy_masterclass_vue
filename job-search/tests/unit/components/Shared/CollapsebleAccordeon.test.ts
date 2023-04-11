import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import CollapsebleAccordeon from "@/components/Shared/CollapsibleAccordion.vue";

describe("CollapsebleAccordeon.vue", () => {
  const renderCollapsebleAccordeon = (config = {}) => {
    render(CollapsebleAccordeon, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
        },
      },
      props: {
        header: "My category",
      },
      slots: {
        default: `
          <template #default>
            <p>My nested content</p>
          </template>
        `,
      },
      ...config,
    });
  };

  it("renders child content when clicked", async () => {
    const props = {
      header: "My category",
      childContent: "My nested content",
    };
    const slots = {
      default: `
        <template #default>
          <p>My nested content</p>
        </template>
      `,
    };
    const config = { props, slots };
    renderCollapsebleAccordeon(config);

    expect(screen.queryByText("My nested content")).not.toBeInTheDocument();
    const button = screen.getByRole("button", { name: /my category/i });
    await userEvent.click(button);
    expect(screen.getByText("My nested content")).toBeInTheDocument();
  });

  describe("when parent does NOT provide custom child content", () => {
    it("renders default content", async () => {
      const props = {
        header: "My category",
      };
      const slots = {};
      const config = { props, slots };
      renderCollapsebleAccordeon(config);

      const button = screen.getByRole("button", { name: /my category/i });
      await userEvent.click(button);
      expect(
        screen.getByText("Whoops, somebody forgot to populate me!")
      ).toBeInTheDocument();
    });
  });
});
