import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import CollapsebleAccordeon from "@/components/Shared/CollapsibleAccordion.vue";

describe("CollapsebleAccordeon.vue", () => {
  const renderCollapsebleAccordeon = (props, slots) => {
    render(CollapsebleAccordeon, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
        },
      },
      props,
      slots,
    });
  };

  it("renders child content when clicked", async () => {
    renderCollapsebleAccordeon(
      {
        header: "My category",
        childContent: "My nested content",
      },
      {
        default: `
          <template #default>
            <p>My nested content</p>
          </template>
        `,
      }
    );

    expect(screen.queryByText("My nested content")).not.toBeInTheDocument();
    const button = screen.getByRole("button", { name: /my category/i });
    await userEvent.click(button);
    expect(screen.getByText("My nested content")).toBeInTheDocument();
  });

  describe("when parent does NOT provide custom child content", () => {
    it("renders default content", async () => {
      renderCollapsebleAccordeon({
        header: "My category",
        childContent: "My nested content",
      });

      const button = screen.getByRole("button", { name: /my category/i });
      await userEvent.click(button);
      expect(
        screen.getByText("Whoops, somebody forgot to populate me!")
      ).toBeInTheDocument();
    });
  });
});
