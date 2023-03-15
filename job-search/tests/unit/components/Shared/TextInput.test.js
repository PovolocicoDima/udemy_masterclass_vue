import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import TextInput from "@/components/Shared/TextInput.vue";

describe("TextInput", () => {
  it("commucates that user has entered component", async () => {
    const { emitted } = render(TextInput, {
      props: {
        modelValue: "",
      },
    });

    const input = screen.getByRole("textbox");
    await userEvent.type(input, "Front-end developer");
    const messages = emitted()["update:modelValue"];
    expect(messages).toEqual([
      ["F"],
      ["Fr"],
      ["Fro"],
      ["Fron"],
      ["Front"],
      ["Front-"],
      ["Front-e"],
      ["Front-en"],
      ["Front-end"],
      ["Front-end "],
      ["Front-end d"],
      ["Front-end de"],
      ["Front-end dev"],
      ["Front-end deve"],
      ["Front-end devel"],
      ["Front-end develo"],
      ["Front-end develop"],
      ["Front-end develope"],
      ["Front-end developer"],
    ]);
  });
});
