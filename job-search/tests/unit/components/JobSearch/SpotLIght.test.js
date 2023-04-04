import { screen, render } from "@testing-library/vue";
import axios from "axios";
import SpotLight from "@/components/JobSearch/SpotLight.vue";

vi.mock("axios");

describe("SpotLight.vue", () => {
  it("provides image to parent component", async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          title: "some_title",
          description: "some_description",
          img: "some_image.jpg",
        },
      ],
    });

    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps">
                    <h1>{{ slotProps.img }}</h1>
                </template>`,
      },
    });

    const text = await screen.findByText("some_image.jpg");
    expect(text).toBeInTheDocument();
  });

  it("provides title to parent component", async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          title: "some_title",
          description: "some_description",
          img: "some_image.jpg",
        },
      ],
    });

    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps">
                    <h1>{{ slotProps.title }}</h1>
                </template>`,
      },
    });

    const text = await screen.findByText("some_title");
    expect(text).toBeInTheDocument();
  });

  it("provides description to parent component", async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          title: "some_title",
          description: "some_description",
          img: "some_image.jpg",
        },
      ],
    });

    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps">
                    <h1>{{ slotProps.description }}</h1>
                </template>`,
      },
    });

    const text = await screen.findByText("some_description");
    expect(text).toBeInTheDocument();
  });
});
