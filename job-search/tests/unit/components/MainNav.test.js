import { render, screen } from "@testing-library/vue";
import MainNav from "@/components/MainNav.vue";

describe("MainNav", () => {
  it("it displays company name", () => {
    render(MainNav);
    const companyName = screen.getByText("Dima's Careers");
    expect(companyName).toBeInTheDocument();
  });
});
