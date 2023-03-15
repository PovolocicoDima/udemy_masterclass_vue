import { render, screen } from "@testing-library/vue";
import { nextTick } from "vue";
import TheHeadline from "@/components/JobSearch/TheHeadline.vue";

describe("TheHeadline", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("displays introductory action verb", () => {
    render(TheHeadline);

    const actionPhrase = screen.getByRole("heading", {
      name: /build for everyone/i,
    });

    expect(actionPhrase).toBeInTheDocument();
  });

  it("change action verb at a consistent interval", () => {
    const mock = vi.fn();
    vi.stubGlobal("setInterval", mock);
    render(TheHeadline);
    expect(mock).toHaveBeenCalled();
  });

  it("swaps action verb after interval", async () => {
    render(TheHeadline);
    vi.advanceTimersToNextTimer();

    await nextTick();
    const actionPhrase = screen.getByRole("heading", {
      name: /design for everyone/i,
    });

    expect(actionPhrase).toBeInTheDocument();
  });

  it("clears interval when component is unmounted", () => {
    const mockClearInterval = vi.fn();
    vi.stubGlobal("clearInterval", mockClearInterval);

    const { unmount } = render(TheHeadline);
    unmount();
    expect(mockClearInterval).toHaveBeenCalled();
    vi.unstubAllGlobals();
  });
});
