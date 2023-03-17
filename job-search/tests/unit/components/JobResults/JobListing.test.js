import { screen, render } from "@testing-library/vue";
import JobListing from "@/components/JobResults/JobListing.vue";
import { RouterLinkStub } from "@vue/test-utils";

describe("JobListing.vue", () => {
  const createJob = (jobProps = {}) => ({
    title: "Software Engineer",
    organization: "Google",
    locations: ["Orlando", "Remote"],
    minimumQualifications: ["coding", "jogging"],
    ...jobProps,
  });

  const rendersJobListing = (jobProps) => {
    render(JobListing, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
      props: {
        job: {
          ...jobProps,
        },
      },
    });
  };

  it("should render job title", () => {
    const jobProps = createJob({ title: "Vue developer" });
    rendersJobListing(jobProps);
    expect(screen.getByText("Vue developer")).toBeInTheDocument();
  });

  it("should render job organization", () => {
    const jobProps = createJob({ organization: "Microsoft" });
    rendersJobListing(jobProps);
    expect(screen.getByText("Microsoft")).toBeInTheDocument();
  });

  it("renders job locations", () => {
    const jobProps = createJob({ locations: ["Remote", "New York"] });
    rendersJobListing(jobProps);
    expect(screen.getByText("Remote")).toBeInTheDocument();
    expect(screen.getByText("New York")).toBeInTheDocument();
  });

  it("renders job qualifications", () => {
    const jobProps = createJob({ minimumQualifications: ["code", "develop"] });
    rendersJobListing(jobProps);
    expect(screen.getByText("code")).toBeInTheDocument();
    expect(screen.getByText("develop")).toBeInTheDocument();
  });
});
